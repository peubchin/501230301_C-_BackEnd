import express from "express";
import {listCategory, createCategory, RenderPageCreateCategory, RenderPageUpdateCategory, UpdateCategory, RenderPageDeleteCategory, DeleteCategory} from "../controller/categoryController.js";
// import routers from ".";
const router=express.Router();

router.get('/',listCategory)
router.get('/create',RenderPageCreateCategory)//render ra trang
router.post('/create',createCategory)

router.get('/update/:id',RenderPageUpdateCategory)//render ra trang
router.post('/update',UpdateCategory)

router.get('/delete/:id',RenderPageDeleteCategory)//render ra trang
router.post('/delete',DeleteCategory)

export default router;