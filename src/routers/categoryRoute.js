import express from "express";
// import routers from ".";
const router=express.Router();

router.get('/',function(req,res){
  res.send('Categories')
})
router.get('/create',function(req,res){
  res.send('Create category')
})
export default router;