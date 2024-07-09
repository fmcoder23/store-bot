const {Router} = require("@grammyjs/router");
const categoriesBtn = require("../helpers/categories.btn");

const router = new Router((ctx) => ctx.session.step);

const start = router.route("start");
start.hears("Kategoriyalar", async (ctx) => {
  await ctx.reply("Kategoriyalar", {
    reply_markup: {
      remove_keyboard: true,
    },
  });

  await ctx.replyWithPhoto(
    "https://www.freepik.com/free-vector/digital-personal-files-concept-illustration_11641791.htm#fromView=search&page=1&position=14&uuid=28c263ee-3fe4-4775-a318-2aead2a94699",
    {
      reply_markup: {
        ...categoriesBtn,
      },
    }
  );

  ctx.session.step = "category";
});

module.exports = router;
