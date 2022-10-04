import { db } from ".";

import { IBlog } from "../interfaces";
import Blog from "../models/Blog";

export const getProductBySlug = async (slug: string): Promise<IBlog | null> => {
  await db.connect();
  const product = await Blog.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}blog/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Blog.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IBlog[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await Blog.find({
    $text: { $search: term },
  })
    .select("titulo images slug -_id")
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

export const getAllProducts = async (): Promise<IBlog[]> => {
  await db.connect();
  const products = await Blog.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
