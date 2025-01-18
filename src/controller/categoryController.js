import categoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";

export async function listCategory(req, res) {
  try {
    const categories = await categoryModel.find();
    res.render('pages/categories/list',
      {
        title: "categories",
        categories: categories
      })
  } catch (error) {
    console.log(error);
    res.send("Hien khong co san pham nao");
  }
}

export async function createCategory(req, res) {
  const { code, name, image } = req.body
  try {
    await categoryModel.create({
      code, name, image, createdAt: new Date()
    });
    // res.send("Tạo loại sản phẩm thành công")
    res.redirect('/categories')
  } catch (error) {
    console.log(error);
    res.send("Tao sp  khong thanh cong");
  }
}

export async function RenderPageCreateCategory(req, res) {
    res.render("pages/categories/form", {
      title: "Create Categories",
      mode: "Create",
      category: {},
    })
}

export async function UpdateCategory(req, res) {
  const { code, name, image, id } = req.body
  try {
    await categoryModel.updateOne({
      _id: new ObjectId(id)
    }, {
      code,
      name,
      image,
      updatedAt: new Date()
    });
    res.redirect('/categories')
  } catch (error) {
    console.log(error);
    res.send("Sửa loại sp  khong thanh cong");
  }
}

export async function RenderPageUpdateCategory(req, res) {
  const { id } = req.params
  const category = await categoryModel.findOne({_id: id})
  if (category) {
    res.render("pages/categories/form", {
      title: "Update Categories",
      mode: 'Update',
      category,
    })
  } else {
    res.send('Hiện ko có sản phẩm nào phù hợp')
  }
}