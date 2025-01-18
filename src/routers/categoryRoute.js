import express from "express";
import {listCategory, createCategory, RenderPageCreateCategory} from "../controller/categoryController.js";
// import routers from ".";
const router=express.Router();

router.get('/',listCategory)
router.get('/create',RenderPageCreateCategory)//render ra trang
router.post('/create',createCategory)

export default router;