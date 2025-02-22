 import orderModel from "../models/orderModel.js";
import categoryRoute from "./categoryRoute.js";
 import productRoute from "./productRoute.js";
 import orderRoute from "./productRoute.js";
 export default function routers(app){
  app.use("/categories",categoryRoute)
  app.use("/products",productRoute)
  app.use("/orders",orderRoute)
  app.get('/',(req,res)=>{
    res.render("pages/index",{
      title:'Home'
    })
  })
  app.get('/component',(req,res)=>{
    res.render("pages/component",{
      title:'Icons'
    })
  })
  app.get('/form',(req,res)=>{
    res.render("pages/form",{
      title:'Forms'
    })
  })
  app.get('/icon',(req,res)=>{
    res.render("pages/icon",{ 
      title:'Icon'
    })
  })
  app.get('/notification',(req,res)=>{
    res.render("pages/notification",{
      title:'Notification'
    })
  })
  app.get('/table',(req,res)=>{
    res.render("pages/table",{
      title:'Table'
    })
  })
  app.get('/typography',(req,res)=>{
    res.render("pages/typography",{
      title:'Typography'
    })
  })
 }