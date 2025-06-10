const categorySchema = require("../DbSchema/categorySchema");
const fs = require("fs");
const path = require("path");

//localhost:9090/api/v1/category/createCategory
async function createCategory(req, res) {
  let { name, description } = req.body;
  try {
    const createCategory = categorySchema({
      name,
      description,
      image: process.env.HOST_URL + req.file.filename,
    });
    await createCategory.save();
    res.status(201).send({
      success: true,
      msg: "Category is created successful",
      data: createCategory,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      msg: `${error ? error.msg : "Invalid credantial"}`,
      data: error,
    });
  }
}

//localhost:9090/api/v1/category/allCategory
async function allCategory(req, res) {
  try {
    const allCategory = await categorySchema.find({});
    res.status(200).send({
      success: true,
      msg: "Categories fetch successful",
      data: allCategory,
    });
  } catch (error) {
    res.status(404).send({ success: false, msg: error });
  }
}

//localhost:9090/api/v1/category/singleCategory/
async function singleCategory(req, res) {
  let { id } = req.params;
  try {
    const singleCategory = await categorySchema.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Category fetched successful",
      data: singleCategory,
    });
  } catch (error) {
    res.status(404).send({ success: false, msg: error });
  }
}

//localhost:9090/api/v1/category/deleteCategory
async function deleteCategory(req, res) {
  let { id } = req.params;
  try {
    const deleteCategory = await categorySchema.findOneAndDelete({ _id: id });
    const categoryImage = deleteCategory.image.split("/").pop();
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${categoryImage}`,
      (err) => {
        if (err) {
          res.status(400).send({ success: false, msg: err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category deleted successfully",
            deleteCategory,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).send({ success: false, msg: error });
  }
}

//localhost:9090/api/v1/category/updateCategory/
async function updateCategory(req, res) {
  let { id } = req.params;
  let { name, description } = req.body;
  let image = req.file;
  let { filename } = image;
  try {
    const updateCategory = await categorySchema.findOneAndUpdate(
      { _id: id },
      { name, description, image: process.env.HOST_URL + filename }
    );
    const categoryImage = updateCategory.image.split("/").pop();
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${categoryImage}`,
      (err) => {
        if (err) {
          res.status(400).send({ success: false, msg: err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category updates successfully",
            data: updateCategory,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).send({ success: false, msg: error });
  }
}

module.exports = {
  createCategory,
  allCategory,
  singleCategory,
  deleteCategory,
  updateCategory,
};
