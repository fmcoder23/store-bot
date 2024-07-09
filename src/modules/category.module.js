const { Router } = require("@grammyjs/router");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const cartBtn = require("../helpers/cart.btn");
const User = require("../models/user.model");
const homeBtn = require("../helpers/home.btn");
const backBtn = require("../helpers/back.btn");

const router = new Router((ctx) => ctx.session.step);

const category = router.route("category");
category.callbackQuery(/category./, async (ctx) => {
  ctx.session.number = ctx.session.number || 0;
  await ctx.deleteMessage();
  let filter = null;
  const data = ctx.callbackQuery.data.split(".")[1];

  const categories = [
    "Telefonlar",
    "Kompyuterlar",
    "Maishiy Texnikalar",
    "Kitoblar",
  ];

  if (data == "phone") filter = categories[0];
  else if (data == "laptop") filter = categories[1];
  else if (data == "technics") filter = categories[2];
  else if (data == "books") filter = categories[3];

  const products = await Product.find({ category: filter });

  const number = ctx.session.number || 0;

  for (let i = 0; i < products.length; i++) {
    const element = products[i];

    await ctx.replyWithPhoto(element.photo, {
      caption: `${element.name}\n\n${element.description}\n\n$${element.price}`,
      reply_markup: {
        ...cartBtn(`${number}`, element.id),
      },
    });
  }

  await ctx.reply('Mahsulotlar: ', {
    reply_markup: {
      ...backBtn,
      resize_keyboard: true,
    }
  })

  ctx.session.step = "cart";
  await ctx.answerCallbackQuery();
});


category.hears("🔙 Ortga", async (ctx) => {
  console.log("Clicked");
  await ctx.deleteMessage();
  await ctx.reply("Bo'limni Tanlang", {
    reply_markup: {
      ...homeBtn,
      resize_keyboard: true,
    },
  });
  ctx.session.step = "start";
})
const cart = router.route("cart");

cart.callbackQuery(/minus./, async (ctx) => {
  await ctx.answerCallbackQuery();
  let number = null;

  if (ctx.session.number == 0) return;
  const productId = ctx.callbackQuery.data.split(".")[1];

  number = ctx.session.number - 1;

  await ctx.editMessageReplyMarkup({
    reply_markup: {
      ...cartBtn(`${number}`, productId),
    },
  });

  ctx.session.number = number;
});
cart.callbackQuery(/plus./, async (ctx) => {
  const number = ctx.session.number + 1;
  const productId = ctx.callbackQuery.data.split(".")[1];

  await ctx.editMessageReplyMarkup({
    reply_markup: {
      ...cartBtn(`${number}`, productId),
    },
  });

  ctx.session.number = number;
});


cart.callbackQuery(/cart./, async (ctx) => {
  try {
    const productId = ctx.callbackQuery.data.split(".")[1];
    const product = await Product.findById(productId);
    if (!product) {
      return await ctx.answerCallbackQuery('Product not found');
    }

    const productPrice = product.price;
    const user = await User.findOne({ telegramId: ctx.from.id });

    if (!user) {
      return await ctx.answerCallbackQuery('User not found');
    }

    let cart = await Cart.findOne({ userId: user._id, productId });

    if (cart) {
      cart.count += ctx.session.number;
      cart.totalPrice = cart.count * productPrice;
      await cart.save();
    } else {
      const totalPrice = productPrice * ctx.session.number;
      await Cart.create({ productId, count: ctx.session.number, userId: user._id, totalPrice });
    }

    await ctx.deleteMessage();
    await ctx.answerCallbackQuery('Product added to cart');
    ctx.session.number = 0;
  } catch (error) {
    console.error('Error handling cart callback query:', error);
    await ctx.answerCallbackQuery('An error occurred. Please try again later.');
  }
});


cart.hears("🔙 Ortga", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Bo'limni Tanlang", {
    reply_markup: {
      ...homeBtn,
      resize_keyboard: true,
    },
  });
  ctx.session.step = "start";
})

module.exports = router;
