import categoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
import { removeVietNamAccents } from "../common/index.js";

const sortObjects=[
  {code:"name_asc",name:"Tên tăng dần"},
  {code:"name_desc",name:"Tên giảm dần"},
  {code:"code_asc",name:"Mã SP tăng dần"},
  {code:"code_desc",name:"Mã SP giảm dần"},
]

export async function listCategory(req, res) {
  const search=req.query?.search
  const pageSize= !!req.query.pageSize ? parseInt(req.query.pageSize):5
  const page= !!req.query.page ? parseInt(req.query.page):1
  const skip=(page - 1)*pageSize
  const sort= !!req.query.sort ? req.query.sort: null
  const sortOrder={}
  if(sort){

    const [col,ord]=sort.split('_');
    sortOrder[col]=ord
  }
  let filters={
    deleteAt : null
  }
  if(search &&search.length > 0){
    filters.searchString={$regex:removeVietNamAccents(search),$options:"i"}//0 phan biet hoa thuong
  }
  try {
    const countCategories = await categoryModel.countDocuments(filters)
    const categories = await categoryModel.find(filters).sort(sortOrder).skip(skip).limit(pageSize);
    res.render('pages/categories/list',
      {
        title: "categories",
        categories: categories,
        countPagination: Math.ceil(countCategories/pageSize),
        pageSize,
        page,
        sort,
        sortObjects
      });
  } catch (error) {
    console.log(error);
    res.send("Hien khong co san pham nao !");
  }
}

export async function createCategory(req, res) {
  const data= req.body
  try {
    await categoryModel.create({
      ...data, createdAt: new Date()
    });
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
  const { id,...data } = req.body
  try {
    await categoryModel.updateOne({
      _id: new ObjectId(id) }
      ,{
      ...data,
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
  