import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema= new Schema(
  {
    productCode:String,
    productId:Schema.Types.ObjectId,
    quantity:Number,
    total:Number,
    price:Number,
    color:{
      type:String,
      enum:["red","green","yellow","white","black"]
    }
  },{
    versionKey:false
  });
  const orderSchema=new Schema({
    orderNo:String,
    status:{
      type:String,
        enum:["created","completed","cancelled","delivering"]
      },
       orderItems:{
        type:[orderItemSchema],
        require:[true,"Bắt buộc phải có sản phẩm trong đơn hàng"],
      },
      total:Number,
      discount:Number,
      numericalOrder:Number,
      createAt:Date,
      updateAt:Date,
      deleteAt:Date, 
    },
    {
      versionKey:false,
      collection:"orders",
      toJSON:{virtuals:true},
      toObject:{virtuals:true},
    })

    const OrderModel=mongoose.model("Order",orderSchema)
    export default OrderModel