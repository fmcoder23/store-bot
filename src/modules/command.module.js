const { Composer, InlineKeyboard } = require("grammy");
const User = require("../models/user.model");

const homeBtn = require("../helpers/home.btn");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

const bot = new Composer();

bot.command("start", async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });

  if (!user) {
    await User.create({
      telegramId: ctx.from.id,
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
  } else {
    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      {
        $set: {
          firstname: ctx.from.first_name,
          username: ctx.from.username,
        },
      }
    );
  }

  await ctx.reply("Assalomu alaykum, Xush kelibsiz", {
    reply_markup: {
      ...homeBtn,
      resize_keyboard: true,
    },
  });

  ctx.session.step = "start";
});

bot.hears("📱 Bog'lanish", async (ctx) => {
  await ctx.replyWithPhoto(
    "https://unsplash.com/photos/black-and-brown-rotary-phone-near-gray-wall--0xCCPIbl3M",
    {
      caption: `Quyidagi raqamlar orqali bog'lanishingiz mumkin!\n\n+998900000010\n+998200000000`,
    }
  );
});

bot.hears("ℹ️ Biz haqimizda", async (ctx) => {
  await ctx.replyWithPhoto(
    "https://unsplash.com/photos/brown-wooden-9-piece-office-table-and-chairs-1RT4txDDAbM",
    {
      caption: `Bu yerda sizning reklamangiz bo'lisshi mumkin edi!`,
    }
  );
});

bot.hears("🛒 Savat", async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });

  const carts = await Cart.find({ userId: user._id }).populate("productId");

  if (carts.length === 0) {
    await ctx.reply("Savatingiz bo'sh.");
    return;
  }

  let message = `Savatingiz: \n\n`;

  for (let i = 0; i < carts.length; i++) {
    const element = carts[i];
    message += `<b>${element.productId.name}</b> - ${element.count}ta = $${element.totalPrice}\n`;
  }
  message += `\n\n<b>Jami:</b> $${carts.reduce((a, b) => a + b.totalPrice, 0)}`;
  const btn = new InlineKeyboard()
    .text("💳 Buyurtma Berish", "order")
    .row()
    .text("🧹 Tozalash", "cleanCart");

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: {
      ...btn,
    },
  });
});


bot.callbackQuery("cleanCart", async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });

  const carts = await Cart.find({ userId: user._id }).populate("productId");

  for (let i = 0; i < carts.length; i++) {
    const element = carts[i];
    await Cart.deleteOne({ _id: element._id });
  }

  await ctx.deleteMessage();
  await ctx.reply("Savatingiz tozalandi");
})

bot.callbackQuery("back", async (ctx) => {

  await ctx.deleteMessage();
  await ctx.reply("Bo'limni Tanlang", {
    reply_markup: {
      ...homeBtn,
      resize_keyboard: true,
    },
  });
  ctx.session.step = "start";
})

bot.callbackQuery("order", async (ctx) => {
  await ctx.answerCallbackQuery("Buyurtmangiz rasmiylashtirildi.");
  await ctx.reply("Sizning buyurtmangiz muvaffaqiyatli rasmiylashtirildi ✅");

  const user = await User.findOne({ telegramId: ctx.from.id });

  const carts = await Cart.find({ userId: user._id }).populate("productId");

  if (carts.length === 0) {
    await ctx.reply("Savatingiz bo'sh.");
    return;
  }

  const products = carts.map((item) => ({
    productId: item.productId._id,
    quantity: item.count,
    price: item.productId.price,
  }));

  const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

  await Order.create({
    userId: user._id,
    products,
    totalPrice,
  });

  await Cart.deleteMany({ userId: user._id });

  await ctx.deleteMessage();
  await ctx.reply("Savatingiz tozalandi va buyurtma qabul qilindi.");
});

const groupId = '-1002217436358';
bot.hears("Izoh", async (ctx) => {
  ctx.session.step = "comment";
  await ctx.reply("Izohingizni qoldiring...");
});

bot.on("message", async (ctx) => {
  if (ctx.session.step === "comment" && ctx.message.text !== "Izoh") {
    await ctx.api.forwardMessage(groupId, ctx.message.chat.id, ctx.message.message_id);
    ctx.session.step = "start";
    await ctx.reply("Izohingiz uchun rahmat. ✅\n\nBiz tez orada izohingizni ko'rib chiqamiz va kerakli chora-tadbirlarni ko'ramiz.");
  }
});

bot.hears("🔙 Ortga", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Bo'limni Tanlang", {
    reply_markup: {
      ...homeBtn,
      resize_keyboard: true,
    },
  });
  ctx.session.step = "start";
})

module.exports = bot;
