const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
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
      type: String,
    },
    product: {
      type: String,
      ref: "product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categorie", categorySchema);
