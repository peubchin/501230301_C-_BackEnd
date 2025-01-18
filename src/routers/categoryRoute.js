import express from "express";
import {listCategory, createCategory, RenderPageCreateCategory, RenderPageUpdateCategory, UpdateCategory} from "../controller/categoryController.js";
// import routers from ".";
const router=express.Router();

router.get('/',listCategory)
router.get('/create',RenderPageCreateCategory)//render ra trang
router.post('/create',createCategory)

router.get('/update/:id',RenderPageUpdateCategory)//render ra trang
router.post('/update',UpdateCategory)

export default router;