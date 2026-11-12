import React from "react";
import { Card, CardAction, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export const Product_Tile = ({
  product,
  setFormData,
  setOpenSheet,
  setCurrentEditId,
  handleDelete,
}) => {
  return (
    <>
      <Card className="flex ">
        <div className="p-3">
          <h2>{product.title}</h2>
          <div>
            <img
              className="w-72 h-44"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>

        <CardContent className=" px-3">
          <h2>{product.description}</h2>
          <div>
            <span>{product.price}</span>
            <span>{product.salePrice}</span>
          </div>
        </CardContent>
        <CardAction className=" px-3 flex justify-between  w-full">
          <Button 
            onClick={() => {
              setCurrentEditId(product._id);
              setFormData(product);
              setOpenSheet(true);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(product._id);
            }}
          >
            Delete
          </Button>
        </CardAction>
      </Card>
    </>
  );
};
