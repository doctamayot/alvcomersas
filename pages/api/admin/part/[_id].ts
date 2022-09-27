import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Part, Movimiento } from "../../../../models";
import { IInventory } from "../../../../interfaces/inventory";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = { message: string } | IInventory;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    // case "GET":
    //   return getProductBySlug(req, res);

    case "POST":
      return createMov(req, res);
    case "PUT":
      return updateProduct(req, res);

    case "DELETE":
      return deleteProduct(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

// async function getProductBySlug(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { slug } = req.query;
//   await db.connect();
//   const product = await Product.findOne({ slug }).lean();
//   await db.connect();

//   if (!product) {
//     return res.status(404).json({ message: "Producto no encontrado" });
//   }
//   res.status(200).json(product);
// }

const createMov = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    // const productInDB = await Movimiento.findOne({ titulo: req.body.titulo });
    // if (productInDB) {
    //   await db.disconnect();
    //   return res
    //     .status(400)
    //     .json({ message: "Ya existe un producto con ese slug" });
    // }

    const product = new Movimiento(req.body);
    await product.save();

    const { _id } = req.query;
    const { valor, tipo } = req.body;

    if (tipo === "entrada") {
      const partUpdated = await Part.findByIdAndUpdate(
        _id,
        {
          $push: { movimientos: product._id },
          $inc: { cantidad: valor },
        },

        { useFindAndModify: false }
      );
    } else if (tipo === "salida") {
      const partUpdated = await Part.findByIdAndUpdate(
        _id,
        {
          $push: { movimientos: product._id },
          $inc: { cantidad: -valor },
        },

        { useFindAndModify: false }
      );
    } else {
      const partUpdated = await Part.findByIdAndUpdate(
        _id,
        {
          $push: { movimientos: product._id },
          $set: { cantidad: 0 },
        },

        { useFindAndModify: false }
      );
    }

    // res.status(200).json(partUpdated as any);
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar logs del servidor" });
  }
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IInventory;
  const { _id } = req.query;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El id del producto no es válido" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos 2 imágenes" });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    const product = await Part.findById(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        // Borrar de cloudinary
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        console.log({ image, fileId, extension });
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const deleteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  const { _id } = req.query;

  try {
    await db.connect();

    const product = await Part.findByIdAndDelete(_id);
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
};
