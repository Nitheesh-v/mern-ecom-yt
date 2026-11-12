import mongoose, { Mongoose } from "mongoose";
const ProductSchema=new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
 totalStock: {
  type: Number,
  required: true,
  default: 0,
}


}  ,{timestamps:true})



export const Product =mongoose.model("Product",ProductSchema)