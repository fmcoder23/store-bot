const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
  },
  {timestamps: true}
);

module.exports = model("User", schema);
