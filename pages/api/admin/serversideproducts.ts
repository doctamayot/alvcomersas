import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

import { db } from "../../../database";
import { IProducto } from "../../../interfaces/productos";
import Product from "../../../models/Product";

type Data = { message: string } | IProducto[] | IProducto;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return getProducts(req, res);

    // case "PUT":
    //   return updateProduct(req, res);

    // case "POST":
    //   return createProduct(req, res);

    // case "DELETE":
    //   return deleteProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.body as any;

  await db.connect();

  const product = await Product.findOne({ slug: slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  //   product.images = product.images.map((image) => {
  //     return image.includes("http")
  //       ? image
  //       : `https://alvcomer.com.co/products/${image}`;
  //   });

  //return JSON.parse(JSON.stringify(product));

  res.status(200).json(product);
};
