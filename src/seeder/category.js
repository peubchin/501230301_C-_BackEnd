import categoryModel from "../models/categoryModel.js";
const data=[
  {
    code:"AN_001",
    name:"Áo nữ",
    image:"cat-1.jpg",
    searchString:"ao nu",
    createAt:new Date(),
  },
  {
    code:"MA_001",
    name:"Máy ảnh",
    image:"cat-2.jpg",
    searchString:"may anh",
    createAt:new Date(),
  },
  {
    code:"GN_001",
    name:"Giày nam",
    image:"cat-3.jpg",
    searchString:"giay nam",
    createAt:new Date(),
  },
  {
    code:"MP_001",
    name:"Mỹ phẩm",
    image:"cat-4.jpg",
    searchString:"my pham",
    createAt:new Date(),
  }
]
export default async function categorySeeder(){
    await categoryModel.deleteMany();
    await categoryModel.insertMany(data);
}