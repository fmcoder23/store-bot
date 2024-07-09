const { InlineKeyboard } = require("grammy");

const categoriesBtn = new InlineKeyboard()
  .text("Telefon", "category.phone")
  .text("Kompyuterlar", "category.laptop")
  .row()
  .text("Maishiy Texnika", "category.technics")
  .text("Kitoblar", "category.books")
  .row()
  .text("Ortga", "back");

module.exports = categoriesBtn;
