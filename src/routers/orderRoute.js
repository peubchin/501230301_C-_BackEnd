import express from "express";
import{
  listOrder,createOrder,
} from "../controller/orderController";
const router=express.Router();
router.get("/",listOrder)
router.get("/create",createOrder)
export default router;