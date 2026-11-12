import express, { Router } from "express";
import { upload } from "../../Helpers/Cloudinary.js"
import handleImgUpload, { AddProd, DeleteData, EditProd, FetchData } from "../../controllers/admin/prod_controller.js";


export const prod_router=express.Router();
prod_router.post("/upload-img",upload.single("my-file"),handleImgUpload)


prod_router.post("/add",AddProd)
prod_router.get("/get",FetchData)
prod_router.put("/edit/:id",EditProd)
prod_router.delete("/delete/:id",DeleteData)

