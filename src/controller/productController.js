import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
import { removeVietNamAccents } from "../common/index.js";

const sortObjects=[
  {code:"name_asc",name:"Tên tăng dần"},
  {code:"name_desc",name:"Tên giảm dần"},
  {code:"code_asc",name:"Mã SP tăng dần"},
  {code:"code_desc",name:"Mã SP giảm dần"},
]
const sizes=["S","M","L","XL"];
const colors=["red","green","yellow","white","black"]
export async function listProduct(req, res) {
  const search=req.query?.search
  const pageSize= !!req.query.pageSize ? parseInt(req.query.pageSize):5
  const page= !!req.query.page ? parseInt(req.query.page):1
  const skip=(page - 1)*pageSize
  const sort= !!req.query.sort ? req.query.sort: null
  let sortOrder={}
  if(sort){
    const [col,ord]=sort.split('_');
    sortOrder[col]=ord
  }else{
    sortOrder={createAt:-1}
  }
  let filters={
    deleteAt : null
  }
  if(search &&search.length > 0){
    filters.searchString={$regex:removeVietNamAccents(search),$options:"i"}//0 phan biet hoa thuong
  }

  try {
    const countProducts = await productModel.countDocuments(filters)
    const products = await productModel.find(filters).populate("category").sort(sortOrder).skip(skip).limit(pageSize);
    res.render('pages/products/list',
      {
        title: "products",
        products: products,
        countPagination: Math.ceil(countProducts/pageSize),
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

export async function createProduct(req, res) {
  const categories=await categoryModel.find({deleteAt:null})
  const {sizes:productSize ,colors:productColor, image,...dataOther}= req.body
  // return
  let sizeArray=[],colorArray=[],imageArray=[image];
  if(typeof productSize ==="string"){
    sizeArray=[productSize]
  }
  if(typeof productSize ==="object"){
    sizeArray=productSize
  }
  if(typeof productColor ==="string"){
    colorArray=[productColor]
  }
  if(typeof productColor ==="object"){
    colorArray=productColor
  }
  try {
    const product =await productModel.findOne({code:dataOther.code,deleteAt:null})
    if(product){
      throw("code")
    } 
    await productModel.create({
      sizes:sizeArray,
      colors:colorArray,
      images:imageArray,
      ...dataOther, createdAt: new Date()
    });
    res.redirect('/products')
  } catch (error) {
    console.log("error",error);
    let err={}
    if(error==="code"){
      err.code="Ma san pham da ton tai"
    }
    if(error.name==="ValidationError"){
      Object.keys(error.errors).forEach(key=>{
        err[key]=error.errors[key].message
      })
    }
    console.log("err ", err);
    res.render("pages/products/form", {
      title: "Create products",
      mode: "Create",
      product: {
        sizes:sizeArray,
        colors:colorArray,
        ...dataOther
      },
    sizes: sizes,
    colors:colors,
    categories:categories,
    err
    })
  }
}

export async function RenderPageCreateProduct(req, res) {
  const categories=await categoryModel.find({deleteAt:null})
  res.render("pages/products/form", {
    title: "Create products",
    mode: "Create",
    product: {},
    sizes: sizes,
    colors:colors,
    categories: categories,
    err:{}
  })
}

export async function UpdateProduct(req, res) {
  const {id} = req.params;
  const {sizes:productSize ,colors:productColor, image,...dataOther} = req.body
  let sizeArray=[],colorArray=[],imageArray=[image];
  if(typeof productSize ==="string"){
    sizeArray=[productSize]
  }
  if(typeof productSize ==="object"){
    sizeArray=productSize
  }
  if(typeof productColor ==="string"){
    colorArray=[productColor]
  }
  if(typeof productColor ==="object"){
    colorArray=productColor
  }
  try {
    const product =await productModel.findOne({_id:{$ne: new ObjectId(id)},code:dataOther.code,deleteAt:null})
    if(product){
      throw("code")
    }
    await productModel.updateOne({
      _id: new ObjectId(id) }
      ,{
      ...dataOther,
      updatedAt: new Date()
    });
    res.redirect('/products')
  } catch (error) {
    console.log("err ", error);
    let err={}
    if(error==="code"){
      err.code="Ma san pham da ton tai"
    }
    if(error.name==="ValidationError"){
      Object.keys(error.errors).forEach(key=>{
        err[key]=error.errors[key].message
      })
    }    
    res.render("pages/products/form", {
      title: "Update products",
      mode: "Update",
      product: {
      sizes: sizeArray,
      colors:colorArray,
      ...dataOther},
      err
    })  }
}

export async function RenderPageUpdateProduct(req, res) {
  const {id}=req.params;
  try {
    const product=await productModel.findOne({_id:id,deleteAt:null});
    if(product){
      const categories=await categoryModel.find({deleteAt:null})
      res.render("pages/products/form", {
        title: "Update Products",
        mode: "Update",
        product,
        sizes: sizes,
        colors:colors,
        categories: categories,
        err:{}
      })
    }else{
      res.send("Hiện không có sản phẩm nào phù hợp!");
    }
  } catch (error) {
    console.log(error);
    res.send("Trang web này không tồn tại");
  }
}
export async function DeleteProduct(req, res) {
  const { id } = req.body
  try {
    await productModel.updateOne({
      _id: new ObjectId(id) },
    {
      deleteAt: new Date()
    })
    res.redirect('/products')
  } catch (error) {
    console.log(error);
    res.send("Xóa loại sp  khong thanh cong");
  }
}

export async function RenderPageDeleteProduct(req, res) {
  try {
    const {id}=req.params;
  const product=await productModel.findOne({_id: new ObjectId(id),deleteAt:null});
  if(product){
    
    res.render("pages/products/form", {
      title: "Delete products",
      mode: "Delete",
      product:product,
      err:{}
    })
  }else{
    res.send("Hiện không có sản phẩm nào phù hợp!");
  }
} catch (error) {
  console.log(error);
  res.send('Trang web này không tồn tại!')  
}
}
  