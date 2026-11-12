import e from "express";
import { imgUploadUtil } from "../../Helpers/Cloudinary.js";
import { Product } from "../../model/Product.js";

const handleImgUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imgUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed"
    });
  }
};

//ADD product

export const AddProd = async (req, res) => {
  try {
     const { image, title, description, category, price, salePrice, totalStock }=req.body
     console.log(req.body);
     
  const newProd=new Product({image, title, description, category, price, salePrice, totalStock})
  await newProd.save()
  res.status(200).json({success:true,message:"data added succesfully", data:newProd})

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"operation failed"})
    
  }
 
};

//fetch data

export const FetchData=async(req,res)=>{
  try {
    const ListofProd=await Product.find({})
    res.status(200).json({success:true,data:ListofProd})
  } catch (error) {
    console.log(error);
     res.status(500).json({success:false,message:"operation failed"})
  }
}

//edit data

export const EditProd=async(req,res)=>{
try {
  const {id}=req.params
  const { image, title, description, category,brand, price, salePrice, totalStock }=req.body
  const Findprod=await Product.findById(id)
  if(!Findprod){
    return res.status(400).json({success:false,message:"product not found"})

  }
  Findprod.title=title || Findprod.title
   Findprod.description=description || Findprod.description
   Findprod.category=category || Findprod.description
   Findprod.brand=brand || Findprod.brand
   Findprod.price = price || Findprod.price
   Findprod.salePrice=salePrice || Findprod.salePrice
   Findprod.totalStock= totalStock || Findprod.totalStock
   Findprod.image=typeof image === "string" ? image : Findprod.image;
   await Findprod.save()
       res.status(200).json({success:true,data:Findprod})


} catch (error) {
  console.log(error);
   res.status(500).json({success:false,message:"operation failed"})
}
}

//delete data

export const DeleteData=async(req,res)=>{
try {
  const {id}=req.params
  const product=await Product.findByIdAndDelete(id)
  if(!product){
    return res.status(400).json({success:false,message:"product not found"})

  }
 res.status(200).json({success:true,message:"Data Deleted succesfully"})

  
} catch (error) {
  console.log(error);
  
}
}


export default handleImgUpload;
