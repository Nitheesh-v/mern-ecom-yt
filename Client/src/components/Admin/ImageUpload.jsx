import React, { useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { CiCircleRemove, CiFileOn } from "react-icons/ci";
import { Button } from "../ui/button";
import axios from "axios";

export const ImageUpload = ({
  imgFile,
  setImgFile,
  uploadedURL,
  setUploadedURL,
  imgloading,
  setImgloading,
}) => {
  const inpRef = useRef(null);

  useEffect(() => {
    if (imgFile && !imgloading) {
      uploadimgtocloudinary();
    }
  }, [imgFile]);

  const uploadimgtocloudinary = async () => {
    try {
      setImgloading(true);

      const data = new FormData();
      data.append("my-file", imgFile);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-img",
        data,
      );

      console.log(response, "response");

      if (response?.data?.success) {
        setUploadedURL(response.data.result.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImgloading(false);
    }
  };

  const handleImgFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setImgFile(null);

    if (inpRef.current) {
      inpRef.current.value = "";
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const dropFile = event.dataTransfer.files?.[0];

    if (dropFile) {
      setImgFile(dropFile);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <Label>Upload Image</Label>

        <div
          className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Input
            id="img-upload"
            type="file"
            ref={inpRef}
            className="hidden"
            onChange={handleImgFileChange}
          />

          {!imgFile && (
            <Label
              htmlFor="img-upload"
              className="cursor-pointer flex items-center gap-2 justify-center"
            >
              <CiFileOn size={24} />
              Drag & Drop or Click to Upload
            </Label>
          )}
        </div>
      </div>

      {imgFile && (
        <div className="flex items-center gap-3 mt-3">
          <CiFileOn size={24} />

          <div className="flex justify-between w-full">
            <p>{imgFile.name}</p>

            <Button variant="destructive" onClick={handleRemoveFile}>
              <CiCircleRemove />
              Remove
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
