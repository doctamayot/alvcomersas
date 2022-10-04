import mongoose, { Schema, model, Model } from "mongoose";
import { IBlog } from "../interfaces";

const BlogSchema = new Schema(
  {
    copy: { type: String, required: true },
    images: [{ type: String }],
    slug: { type: String, required: false, unique: true },
    titulo: { type: String, required: true },
  },
  { timestamps: true }
);
BlogSchema.plugin(require("mongoose-autopopulate"));
BlogSchema.index({ titulo: "text", tags: "text" });

const Blog: Model<IBlog> = mongoose.models.Blog || model("Blog", BlogSchema);

export default Blog;
