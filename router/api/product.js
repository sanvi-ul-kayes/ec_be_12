const express = require("express");
const {
  createProductController,
  singleProductController,
  allProductController,
  deleteProductController,
  updateProductController,
} = require("../../Controllers/productControllers");
const upload = require("../../helpers/imageHandlerMiddleWare");
const router = express.Router();

//localhost:9090/api/v1/product/createProduct
router.post("/createProduct", upload.array("images"), createProductController);

//localhost:9090/api/v1/product/singleProduct
router.get("/singleProduct/:Productid", singleProductController);

//localhost:9090/api/v1/product/allProduct
router.get("/allProduct", allProductController);

//localhost:9090/api/v1/product/deleteProduct
router.delete("/deleteProduct/:productId", deleteProductController);

//localhost:9090/api/v1/product/updateProduct
router.patch(
  "/updateProduct/:productId",
  upload.array("images"),
  updateProductController
);

module.exports = router;
