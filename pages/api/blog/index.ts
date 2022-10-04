import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import Blog from "../../../models/Blog";
import { IBlog } from "../../../interfaces";

type Data = { message: string } | IBlog[];

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
    ].includes(`${categoria}`)
  ) {
    condition = { categoria };
  }

  await db.connect();
  const products = await Blog.find()
    .select("titulo copy images slug -_id")
    .sort("createdAt")
    .lean();

  await db.disconnect();
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}blog/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
}
