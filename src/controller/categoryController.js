import categoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";

export async function listCategory(req, res) {
  try {
    const categories = await categoryModel.find({ deleteAt : null });
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
    category: {}
  })
}

export async function UpdateCategory(req, res) {
  // const {id} = req.params;
  const { id, code, name, image } = req.body
  try {
    await categoryModel.updateOne({
      _id: new ObjectId(id) }
      ,{
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
  const {id}=req.params;
  try {
    const category=await categoryModel.findOne({_id: new ObjectId(id),deleteAt:null});
    if(category){
  
      res.render("pages/categories/form", {
        title: "Update Categories",
        mode: "Update",
        category:category
      })
    }else{
      res.send("Hiện không có sản phẩm nào phù hợp!");
    }
  } catch (error) {
    console.log(error);
    res.send("Trang web này không tồn tại");
  }

}
export async function DeleteCategory(req, res) {
  const { id } = req.body
  try {
    await categoryModel.updateOne({
      _id: new ObjectId(id) },
    {
      deleteAt: new Date()
    })
    res.redirect('/categories')
  } catch (error) {
    console.log(error);
    res.send("Xóa loại sp  khong thanh cong");
  }
}

export async function RenderPageDeleteCategory(req, res) {
  try {
    const {id}=req.params;
  const category=await categoryModel.findOne({_id: new ObjectId(id),deleteAt:null});
  if(category){

    res.render("pages/categories/form", {
      title: "Delete Categories",
      mode: "Delete",
      category:category
    })
  }else{
    res.send("Hiện không có sản phẩm nào phù hợp!");
  }
} catch (error) {
  console.log(error);
  res.send('Trang web này không tồn tại!')  
}
}
  