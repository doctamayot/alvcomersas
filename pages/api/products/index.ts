import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import Product from "../../../models/Product";
import { IProducto } from "../../../interfaces/productos";

type Data = { message: string } | IProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { categoria = "all" } = req.query;

  let condition = {};

  if (
    categoria !== "all" &&
    [
      "Equipo Militar o Camping",
      "Herrajes",
      "Institucional",
      "Servicio de Troquelado y Embutido",
      "Botas Multiproposito",
    ].includes(`${categoria}`)
  ) {
    condition = { categoria };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select("titulo copy images slug -_id")
    .lean();

  await db.disconnect();
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `https://alvcomer.com.co/products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
}
