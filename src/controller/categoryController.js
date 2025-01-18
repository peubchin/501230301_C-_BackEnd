import categoryModel from "../models/categoryModel.js";
export async function listCategory(req,res){
  try{
    const categories= await categoryModel.find();
    res.render('pages/categories/list',
      {title:"categories",
        categories: categories
      })
  }catch(error)
  {
console.log(error);
res.send("Hien khong co san pham nao");
  } 
}