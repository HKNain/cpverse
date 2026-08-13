import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  solutions: Types.ObjectId[];
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    solutions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);