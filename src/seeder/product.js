import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
const data=[
  {
    code:"AN_001",
    name:"Áo nữ",
    price:1000000,
    images:["product-2.jpg"],
    searchString:"ao nu",
    sizes:["S","M","L","XL"],
    colors:["red","green","yellow"],
    active:'on',
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    information:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    categoryCode:"AN_001",
    createAt:new Date(),
  },
  {
    code:"MA_001",
    name:"Máy ảnh",
    price:5000000,
    images:["product-1.jpg"],
    searchString:"may anh",
    sizes:["S","M","L","XL"],
    colors:["red","green","yellow"],
    active:'on',
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    information:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    categoryCode:"MA_001",
    createAt:new Date(),
  },
  {
    code:"GN_001",
    name:"Giày nam",
    price:1200000,
    images:["product-4.jpg"],
    searchString:"giay nam",
    sizes:["S","M","L","XL"],
    colors:["red","green","yellow"],
    active:'on',
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    information:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    categoryCode:"GN_001",
    createAt:new Date(),
  },
  {
    code:"MP_001",
    name:"Mỹ phẩm",
    price:800000,
    images:["product-8.jpg"],
    searchString:"my pham",
    sizes:["S","M","L","XL"],
    colors:["red","green","yellow"],
    active:'on',
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    information:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    categoryCode:"MP_001",
    createAt:new Date(),
  }
]
export default async function categorySeeder(){
  await productModel.deleteMany()
  const categories=await categoryModel.find({});
  let writeProduct=[];
  for(let product in data){
    const {categoryCode,...dataOther}=data[product];
    const category=categories.find(categoryItem=>{
      return categoryItem.code===categoryCode
    });
writeProduct.push({
  categoryId: !!category?category._id:null,
  ...dataOther
})
  }
  await productModel.insertMany(writeProduct);
}
