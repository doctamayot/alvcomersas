import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

import { db } from "../../../database";
import { IInventory } from "../../../interfaces/inventory";
import { Movimiento } from "../../../models";

type Data = { message: string } | IInventory[] | IInventory;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "DELETE":
      return deleteMov(req, res);

    // case "PUT":
    //   return updateProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Movimiento.find().sort({ titulo: "asc" }).lean();

  await db.disconnect();

  res.status(200).json(products);
};

const deleteMov = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { _id } = req.body;

  try {
    await db.connect();

    const product = await Movimiento.findByIdAndDelete(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar logs del servidor" });
  }

  await db.disconnect();
};
