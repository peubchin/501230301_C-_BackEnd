import mongoose from "mongoose";
const uri="mongodb://127.0.0.1:27017/";
const dbName="cd_backend";
export default function mongoConnect(){
  try{

    mongoose.connect(`${uri}${dbName}`)
    console.log("connect to mongo successfully");
  }catch(error){
    console.log(error);
    console.log("connect failed");
  }

}