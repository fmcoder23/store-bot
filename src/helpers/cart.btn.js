const {Keyboard, InlineKeyboard} = require("grammy");

const cartBtn = (number = 0, productId) => {
  return new InlineKeyboard()
    .text("-", `minus.${productId}`)
    .text(number, `num.${number}`)
    .text("+", `plus.${productId}`)
    .row()
    .text("🛒 Savatga qo'shish", `cart.${productId}`);
};

module.exports = cartBtn;
