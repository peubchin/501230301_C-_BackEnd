import express from "express";
import {listProduct, 
        createProduct, 
        RenderPageCreateProduct, 
        RenderPageUpdateProduct, 
        UpdateProduct,
        RenderPageDeleteProduct,
        DeleteProduct   
}
        from "../controller/productController.js";
// import routers from ".";
const router=express.Router();

router.get('/',listProduct)
router.get('/create',RenderPageCreateProduct)//render ra trang
router.post('/create',createProduct)

router.get('/update/:id',RenderPageUpdateProduct)//render ra trang update
router.post('/update/:id',UpdateProduct)

router.get('/delete/:id',RenderPageDeleteProduct)//render ra trang delete
router.post('/delete',DeleteProduct)

export default router;