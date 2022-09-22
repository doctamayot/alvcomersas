import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProducto } from "../../../interfaces/productos";
import { Product } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProduct(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

async function searchProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res.status(400).json({ message: "Debe especificar una busqueda" });
  }

  q = q.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  })
    .select("titulo copy images slug -_id")
    .lean();
  await db.disconnect();

  return res.status(200).json(products);
}
