import mongoose, { Schema, model, Model } from "mongoose";
import { IInventory } from "../interfaces/inventory";

const InventorySchema = new Schema(
  {
    copy: { type: String, required: true },
    images: [{ type: String }],
    cantidad: { type: Number, required: true },
    //slug: { type: String, required: false, unique: true },
    tags: [{ type: String }],
    producto: {
      type: String,
      // enum: {
      //   values: ["Marmitas", "Herrajes", "Jarron Cantimtplora"],
      //   message: "{VALUE} no es una categoria válida",
      // },
    },
    titulo: { type: String, required: true },
    partes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Part",
        autopopulate: true,
      },
    ],
    movimientos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movimiento",
      },
    ],
  },
  { timestamps: true }
);
InventorySchema.plugin(require("mongoose-autopopulate"));
InventorySchema.index({ titulo: "text", tags: "text" });

const Inventory: Model<IInventory> =
  mongoose.models.Inventory || model("Inventory", InventorySchema);

export default Inventory;
