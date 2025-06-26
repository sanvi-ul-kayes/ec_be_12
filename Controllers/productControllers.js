const productSchema = require("../DbSchema/productSchema");
const fs = require("fs");
const path = require("path");

//localhost:9090/api/v1/product/createProduct
async function createProductController(req, res) {
  let {
    name,
    description,
    discountPrice,
    sellingPrice,
    review,
    rating,
    stock,
    category,
  } = req.body;
  const images = req.files.map((item) => process.env.HOST_URL + item.filename);
  const createProduct = new productSchema({
    name,
    description,
    image: images,
    discountPrice,
    sellingPrice,
    review,
    rating,
    stock,
    category,
  });
  await createProduct.save();
  res.status(201).json({
    success: true,
    msg: "Product created Successfully",
    dat: createProduct,
  });
}

//localhost:9090/api/v1/product/singleProduct
async function singleProductController(req, res) {
  let { Productid } = req.params;
  const singleProduct = await productSchema.findOne({ _id: Productid });
  res.send({
    success: true,
    msg: "Product fetched successfully",
    data: singleProduct,
  });
}

//localhost:9090/api/v1/product/allProduct
async function allProductController(req, res) {
  const allProduct = await productSchema.find({});
  res.status(200).send({
    success: true,
    msg: "All product fetch successfully",
    data: allProduct,
  });
}

//localhost:9090/api/v1/product/deleteProduct
async function deleteProductController(req, res) {
  let { productId } = req.params;
  try {
    const deleteProduct = await productSchema.findOneAndDelete({
      _id: productId,
    });
    const productArray = deleteProduct.image;
    productArray.forEach((element) => {
      const imageProductArray = element.split("/").pop();
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${imageProductArray}`,
        (error) => {
          if (error) {
            res.send(error && error.msg);
          } else {
            res.status(200).send({
              success: true,
              msg: "Product delete successful",
              data: deleteProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid Credantial" });
  }
}

//localhost:9090/api/v1/product/updateProduct
async function updateProductController(req, res) {
  let { productId } = req.params;
  let { name, description } = req.body;
  const images = req.files.map((item) => process.env.HOST_URL + item.filename);

  try {
    const updateProduct = await productSchema.findOneAndUpdate(
      { _id: productId },
      { name, description, image: images }
    );
    const imagePathArray = updateProduct.image;
    imagePathArray.forEach((element) => {
      const oldimagePathArray = element.split("/").pop();
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldimagePathArray}`,
        (err) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json({
              success: true,
              msg: "Product Updated successfully",
              data: updateProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: error });
  }
}
module.exports = {
  createProductController,
  singleProductController,
  allProductController,
  deleteProductController,
  updateProductController,
};
