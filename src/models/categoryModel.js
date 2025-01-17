import mongoose from "mongoose";
const {Schema}=mongoose;

const categorySchema= new Schema({
  code:String,
  name:String,
  image:String,
  createAt:Date,
  updateAt:Date,
  deletedAt:Date,
},{
  versionKey:false,
  collection:'categories'
});

const categoryModel=mongoose.model('category',categorySchema);
export default categoryModel;