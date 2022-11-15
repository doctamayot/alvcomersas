import mongoose, { Schema, model, Model, ObjectId } from "mongoose";

import { IProducto } from "../interfaces/productos";

const productSchema = new Schema(
  {
    copy: { type: String, required: true },
    images: [{ type: String }],
    precio: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    categoria: {
      type: String,
      enum: {
        values: [
          "Equipo Militar o Camping",
          "Herrajes",
          "Institucional",
          "Vallas de Contención",
          "Servicio de Troquelado y Embutido",
          "Placas de Identificación",
          "Botas Multiproposito",
        ],
        message: "{VALUE} no es una categoria válida",
      },
    },
    titulo: { type: String, required: true },
  },
  { timestamps: true }
);

productSchema.index({ titulo: "text", tags: "text" });

const Product: Model<IProducto> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
