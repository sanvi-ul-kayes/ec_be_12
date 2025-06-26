const express = require("express");
const {
  createCategory,
  deleteCategory,
  allCategory,
  singleCategory,
  updateCategory,
} = require("../../Controllers/CategoryController");
const errorHandler = require("../../helpers/errorHandler");
const upload = require("../../helpers/imageHandlerMiddleWare");
const router = express.Router();

//localhost:9090/api/v1/category/createCategory
router.post(
  "/createCategory",
  upload.single("image"),
  errorHandler,
  createCategory
);

//localhost:9090/api/v1/category/deleteCategory
router.delete(
  "/deleteCategory/:id",
  upload.single("image"),
  errorHandler,
  deleteCategory
);

//localhost:9090/api/v1/category/updateCategory
router.patch(
  "/updateCategory/:id",
  upload.single("image"),
  errorHandler,
  updateCategory
);

//localhost:9090/api/v1/category/allCategory
router.get("/allCategory", errorHandler, allCategory);

//localhost:9090/api/v1/category/singleCategory/
router.get("/singleCategory/:id", errorHandler, singleCategory);

module.exports = router;
