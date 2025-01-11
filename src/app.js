import express from 'express';
import path from 'path';
const app=express();
const port=3100
const __dirname=path.resolve()

app.use('/static',express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
app.set('views',__dirname + "/src/views")

// Xem nó có chạy không phải sử dụng app.get
app.get('/',(req,res)=>{
  res.render("pages/index",{
    title:'Index'
  })
})
app.get('/component',(req,res)=>{
  res.render("pages/component",{
    title:'Component'
  })
})
app.get('/form',(req,res)=>{
  res.render("pages/form",{
    title:'Form'
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
app.listen(port,function(){
  console.log("Waiting for you at port "+port);
  
})