import mongoose, { Schema, model, Model } from "mongoose";
import { IInventory } from "../interfaces/inventory";

const PartSchema = new Schema(
  {
    copy: { type: String, required: true },
    images: [{ type: String }],
    cantidad: { type: Number, required: true },

    tags: [{ type: String }],

    titulo: { type: String, required: true },
    movimientos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movimiento",
      },
    ],
  },
  { timestamps: true }
);

PartSchema.index({ titulo: "text", tags: "text" });

const Part: Model<IInventory> =
  mongoose.models.Part || model("Part", PartSchema);

export default Part;
