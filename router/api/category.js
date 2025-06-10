const express = require("express");
const {
  createCategory,
  deleteCategory,
  allCategory,
  singleCategory,
  updateCategory,
} = require("../../Controllers/CategoryController");
const errorHandler = require("../../helpers/errorHandler");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extentionName = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueName + `.${extentionName}`);
  },
});

const upload = multer({ storage: storage });

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
