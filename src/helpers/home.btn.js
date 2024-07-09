const {Keyboard} = require("grammy");

const homeBtn = new Keyboard()
  .text("Kategoriyalar")
  .text("Izoh")
  .row()
  .text("🛒 Savat")
  .row()
  .text("📱 Bog'lanish")
  .text("ℹ️ Biz haqimizda");

module.exports = homeBtn;
