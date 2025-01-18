import categoryModel from "../models/categoryModel.js";
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
      code, name, image,createdAt:new Date()
    });
    res.send("Tạo loại sản phẩm thành công")
    // res.redirect('/categories')
  } catch (error) { 
    console.log(error);
    res.send("Tao sp  khong thanh cong");
  }
}

export async function RenderPageCreateCategory(req, res) {
  res.render("pages/categories/create",{
    title:"Create Categories",
  })
}