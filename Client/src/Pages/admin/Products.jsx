import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { addProductFormElements } from "../../components/config";
import { Fragment, useState } from "react";
import { CommonForm } from "../../components/Common/commonForm/CommonForm";
import { ImageUpload } from "../../components/Admin/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addnewProd,
  deleteprod,
  editprod,
  Fetchprod,
} from "../../store/Admin/Products_Slice";
import { useEffect } from "react";
import { Product_Tile } from "../../components/Admin/Product-Tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export const Products = () => {
  const [formData, setFormData] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [openSheet, setOpenSheet] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [imgloading, setImgloading] = useState(false);
  const { Product_List } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  console.log(currentEditId, "currentifd");

  // useEffect(() => {
  //   console.log(uploadedURL, "imgurl");
  // }, [uploadedURL]);

  function onSubmit(e) {
    console.log(formData);
    // call backend API here
    e.preventDefault();
    // console.log(uploadedURL,"imgurl");

    currentEditId !== null
      ? dispatch(
          editprod({
            id: currentEditId,
            formData: {
              ...formData,
              image: uploadedURL || formData.image,
            },
          }),
        ).then((data) => {
          console.log(data.payload, "EDIT RESPONSE");
          if (data.payload.success) {
            dispatch(Fetchprod());
            setFormData(initialFormData);
            setOpenSheet(false);
            setCurrentEditId(null);
          }
        })
      : dispatch(
          addnewProd({
            ...formData,
            image: uploadedURL,
          }),
        ).then((data) => {
          //console.log(data,"data");
          if (data?.payload?.success) {
            dispatch(Fetchprod());
            setImgFile(null);
            setFormData(initialFormData);
          }
        });
  }

  // useEffect(() => {
  //   console.log(Product_List, "UPDATED LIST");
  // }, [Product_List]);

  useEffect(() => {
    dispatch(Fetchprod());
  }, [dispatch]);
  console.log(Product_List, uploadedURL, "prodList");

  //console.log(formData,"formdata");

  const handleDelete = (getcurrentProdId) => {
    console.log(getcurrentProdId, "deleting id");
    dispatch(deleteprod({ id: getcurrentProdId })).then((data) => {
      console.log(data, "delete data");
      if (data.payload.success) {
        dispatch(Fetchprod());
      }
    });
  };

  const onOpenChange = (isOpen) => {
    setOpenSheet(isOpen);

    if (!isOpen) {
      setCurrentEditId(null);
      setFormData(initialFormData);
      console.log(currentEditId, "curre");
    }
  };
  return (
    <>
    <Fragment>

      {/* //onopen change */}
      <Sheet open={openSheet} onOpenChange={onOpenChange}>
        <div className="flex justify-end">
        <SheetTrigger asChild className="">
          <Button
          className=""
            onClick={() => {
              setFormData(initialFormData);
              setOpenSheet(true);
            }}
          >
            Add New Product
          </Button>
        </SheetTrigger>
       </div>

        <SheetContent side="right" className=" overflow-auto">
          <h2 className="text-lg pl-5 pt-2.5 font-semibold mb-4">
            {currentEditId ? "Edit Product" : "Add New Product"}
          </h2>
          <ImageUpload
            imgFile={imgFile}
            setImgFile={setImgFile}
            uploadedURL={uploadedURL}
            setUploadedURL={setUploadedURL}
            imgloading={imgloading}
            setImgloading={setImgloading}
          />

          <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={currentEditId ? "Update Product" : "Add Product"}
          />
        </SheetContent>
      </Sheet>

      
       
    </Fragment>
     <div className="2xl:container mx-auto mt-5">
  <div className="w-[90%] mx-auto">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {Product_List && Product_List.length > 0
        ? Product_List.map((productItem) => (
            <Product_Tile
              key={productItem._id}
              setOpenSheet={setOpenSheet}
              setFormData={setFormData}
              setCurrentEditId={setCurrentEditId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        : null}
    </div>

  </div>
</div>
    </>
  );
};
