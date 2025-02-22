import OrderModel from "../models/orderModel.js";
import orderModel from "../models/orderModel.js";
import { ObjectId } from "mongodb";

const sortObjects=[
  {code:"name_asc",name:"Tên tăng dần"},
  {code:"name_desc",name:"Tên giảm dần"},
  {code:"code_asc",name:"Mã SP tăng dần"},
  {code:"code_desc",name:"Mã SP giảm dần"},
]

export async function listOrder(req, res) {
  const search=req.query?.search //tìm kiếm
  //phân trang
  const pageSize= !!req.query.pageSize ? parseInt(req.query.pageSize):5
  const page= !!req.query.page ? parseInt(req.query.page):1
  const skip=(page - 1)* pageSize
  //sort
  const sort= !!req.query.sort ? req.query.sort: null
  let sortOrder={}
  if(sort){
    const [col,ord]=sort.split('_');//tách code thành 2, dòng, yêu cầu
    sortOrder[col]=ord
  }else{
    sortOrder={createAt:-1}//sắp xếp mặc định mới nhất.
  }
  let filters={
    deleteAt : null
  }
  if(search &&search.length > 0){
    filters.searchString={$regex:removeVietNamAccents(search),$options:"i"}//0 phan biet hoa thuong
  }

  try {
    const countCategories = await orderModel.countDocuments(filters)
    const categories = await orderModel.find(filters).sort(sortOrder).skip(skip).limit(pageSize);
    // res.render('pages/categories/list',
    //   {
    //     title: "categories",
    //     categories: categories,
    //     countPagination: Math.ceil(countCategories/pageSize),
    //     pageSize,
    //     page,
    //     sort,
    //     sortObjects
    //   });
    res.send({countOrthers,orthers})
  } catch (error) {
    console.log(error);
    res.send("Hien khong co san pham nao !");
  }
}

export async function createOrder(req, res) {
  const {discount,status,orderItems}= req.body//------giả lập nó có sẵn
  let subTotal=0,total=0,numericalOrder=1
  const lastOrder=await OrderModel.findOne().sort({createAt:-1})
  if(lastOrder){
    numericalOrder=lastOrder.numericalOrder+1;
  }
  //để biết được số thứ tự order
  const orderNo="order-"+numericalOrder
  if(orderItems.length>0){
    for(let orderItem of orderItems){
      subTotal+=orderItem.quantity*orderItem.price
    }
  }
  total=subTotal*(100-discount)/100
  try {
    const rs = await orderModel.create({
      orderNo,
      discount,
      total,
      status,
      orderItems,
      numericalOrder,
      createAt:new Date()
      })
      console.log(rs);
      
  }catch(error){
    console.log("err",err);   
  }
}
  
// export async function Updateorder(req, res) {
//   const {id} = req.params;
//   const {...data} = req.body
//   try {
//     const order =await orderModel.findOne({_id:{$ne: new ObjectId(id)},code:data.code,deleteAt:null})
//     if(order){
//       throw("code")
//     }
//     await orderModel.updateOne({
//       _id: new ObjectId(id) }
//       ,{
//       ...data,
//       updatedAt: new Date()
//     });
//     res.redirect('/categories')
//   } catch (error) {
//     console.log(error);
//     let err={}
//     if(error==="code"){
//       err.code="Ma san pham da ton tai"
//     }
//     if(error.name==="ValidationError"){
//       Object.keys(error.errors).forEach(key=>{
//         err[key]=error.errors[key].message
//       })
//     }
//     console.log("err ", err);
    
//     res.render("pages/categories/form", {
//       title: "Update Categories",
//       mode: "Update",
//       order: {...data, _id:id},
//       err
//     })  }
// }

// // export async function RenderPageUpdateOrder(req, res) {
// //   const {id}=req.params;
// //   try {
// //     const order=await orderModel.findOne({_id:id,deleteAt:null});
// //     if(order){
  
// //       res.render("pages/categories/form", {
// //         title: "Update Categories",
// //         mode: "Update",
// //         order:order,
// //         err:{}
// //       })
// //     }else{
// //       res.send("Hiện không có sản phẩm nào phù hợp!");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.send("Trang web này không tồn tại");
// //   }
// // }
// export async function Deleteorder(req, res) {
//   const { id } = req.body
//   try {
//     await orderModel.updateOne({
//       _id: new ObjectId(id) },
//     {
//       deleteAt: new Date()
//     })
//     res.redirect('/categories')
//   } catch (error) {
//     console.log(error);
//     res.send("Xóa loại sp  khong thanh cong");
//   }
// }

// export async function RenderPageDeleteorder(req, res) {
//   try {
//     const {id}=req.params;
//   const order=await orderModel.findOne({_id: new ObjectId(id),deleteAt:null});
//   if(order){

//     res.render("pages/categories/form", {
//       title: "Delete Categories",
//       mode: "Delete",
//       order:order,
//       err:{}
//     })
//   }else{
//     res.send("Hiện không có sản phẩm nào phù hợp!");
//   }
// } catch (error) {
//   console.log(error);
//   res.send('Trang web này không tồn tại!')  
// }
// }
  