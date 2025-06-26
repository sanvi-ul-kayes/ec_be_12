const { default: mongoose } = require("mongoose");
const { array } = require("../helpers/imageHandlerMiddleWare");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
    stock: {
      type: Number,
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
    sellingPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
