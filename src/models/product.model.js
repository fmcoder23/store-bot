const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Telefonlar", "Kompyuterlar", "Maishiy Texnikalar", "Kitoblar"],
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = model("Product", schema);
