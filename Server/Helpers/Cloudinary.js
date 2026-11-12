import {v2 as cloudinary} from 'cloudinary';
import multer from "multer"
cloudinary.config({
  cloud_name: 'dshbuaskr',
  api_key: '151881811119385',
  api_secret: 'XpjjW4ZC6nNmIvp9EO2XyGeOWiw'
});

const storage=new  multer.memoryStorage();
export const imgUploadUtil= async (file)=>{
    const result=await cloudinary.uploader.upload(file,{resource_type:"auto"})
    return result

}
 export const upload=multer({storage})
