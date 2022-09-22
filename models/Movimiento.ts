import mongoose, { Schema, model, Model } from "mongoose";
import { IInventory } from "../interfaces/inventory";

const MovimientoSchema = new Schema(
  {
    valor: { type: Number, required: true },
    titulo: { type: String, required: true },
    tipo: { type: String, required: true },
  },
  { timestamps: true }
);

MovimientoSchema.plugin(require("mongoose-autopopulate"));
MovimientoSchema.index({ titulo: "text", tags: "text" });

const Movimiento: Model<IInventory> =
  mongoose.models.Movimiento || model("Movimiento", MovimientoSchema);

export default Movimiento;
