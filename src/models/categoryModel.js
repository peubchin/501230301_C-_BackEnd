import mongoose from "mongoose";
const {Schema}=mongoose;

const categorySchema= new Schema({
  code:{
    type:String,
    required:[true,"Bat buoc phai nhap ma loai san pham"],
    minLength:[5,"Phai lon hon 5 den 10 ky tu"],
    maxLength:[10,"Ma loai san pham co do dai tu 5 den 10 ky tu"],
  },
  name:{
    type:String,
    required:[true,"Bat buoc phai nhap ten!"],
  },
  image:{
    type:String,
    required:[true,"Bat buoc phai nhap hinh anh!"],
  },
  searchString:{
    type:String,
    required:[true,"Bat buoc phai nhap chuoi tim kiem"],
  },
  createAt:Date,
  updateAt:Date,
  deleteAt:Date
},{
  versionKey:false,
  collection:'categories'
});

const categoryModel=mongoose.model('category',categorySchema);
export default categoryModel;