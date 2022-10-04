import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

import { db } from "../../../database";
import { IBlog } from "../../../interfaces";
import Blog from "../../../models/Blog";

type Data = { message: string } | IBlog[] | IBlog;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      return updateProduct(req, res);

    case "POST":
      return createProduct(req, res);

    case "DELETE":
      return deleteProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Blog.find().lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `/products/${image}`;
    });

    return product;
  });

  res.status(200).json(updatedProducts);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IBlog;

  //console.log(req.body);

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El id del producto no es válido" });
  }

  if (images.length < 1) {
    return res.status(400).json({ message: "Es necesario al menos 1 imágen" });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    const product = await Blog.findById(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    // TODO: eliminar fotos en Cloudinary
    // https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        // Borrar de cloudinary
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        //console.log({ image, fileId, extension });
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IBlog;

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "El producto necesita al menos 1 imágen" });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    const productInDB = await Blog.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un blog con ese titulo" });
    }

    const product = new Blog(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar logs del servidor" });
  }
};

const deleteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id, images = [] } = req.body as IBlog;

  try {
    await db.connect();
    const product = await Blog.findById(_id);

    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    // TODO: eliminar fotos en Cloudinary
    // https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg
    product.images.map(async (image) => {
      // if (!images.includes(image)) {
      // Borrar de cloudinary
      const [fileId, extension] = image
        .substring(image.lastIndexOf("/") + 1)
        .split(".");
      // console.log({ image, fileId, extension });
      // console.log(fileId);
      // console.log(fileId);

      await cloudinary.uploader.destroy(fileId);
      //}
    });
    await Blog.deleteOne({ _id });
    await db.disconnect();

    res.status(200).json({ message: "Producto Borrado" });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar logs del servidor" });
  }
};
