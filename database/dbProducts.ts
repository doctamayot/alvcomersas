import { db } from "./";

import { IProducto } from "../interfaces/productos";
import Product from "../models/Product";

export const getProductBySlug = async (
  slug: string
): Promise<IProducto | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  // product.images = product.images.map( image => {
  //     return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
  // });

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProducto[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: term },
  })
    .select("titulo images precio slug -_id")
    .lean();

  await db.disconnect();

  // const updatedProducts = products.map((product) => {
  //   product.images = product.images.map((image) => {
  //     return image.includes("http")
  //       ? image
  //       : `${process.env.HOST_NAME}productos/${image}`;
  //   });

  //   return product;
  // });

  return products;
};

export const getAllProducts = async (): Promise<IProducto[]> => {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
