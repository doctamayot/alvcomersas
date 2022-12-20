import { db } from ".";
import { Inventory, Movimiento, Part } from "../models";
import { IInventory } from "../interfaces/inventory";

export const getProductBySlug = async (
  _id: string
): Promise<IInventory | null> => {
  await db.connect();
  const product = await Inventory.findOne({ _id })
    .populate("partes movimientos")
    .lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      : `https://alvcomer.com.co/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

export const getPartBySlug = async (
  _id: string
): Promise<IInventory | null> => {
  await db.connect();
  const product = await Part.findOne({ _id }).populate("movimientos").lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      : `https://alvcomer.com.co/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

export const getMovBySlug = async (_id: string): Promise<IInventory | null> => {
  await db.connect();
  const product = await Movimiento.findOne({ _id }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

// interface ProductSlug {
//   id: string;
// }

// export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
//   await db.connect();
//   const slugs = await Inventory.find().select("slug -_id").lean();
//   await db.disconnect();

//   return slugs;
// };

export const getProductsByTerm = async (
  term: string
): Promise<IInventory[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await Inventory.find({
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

export const getAllProducts = async (): Promise<IInventory[]> => {
  await db.connect();
  const products = await Inventory.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
