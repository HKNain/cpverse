import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISolution extends Document {
  title: string;
  slug: string;
  problemUrl: string;
  category: Types.ObjectId;
  code: string;
  videoUrl: string;
  timeComplexity: string;
  spaceComplexity: string;
}

const SolutionSchema = new Schema<ISolution>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    problemUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    timeComplexity: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    spaceComplexity: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Solution ||
  mongoose.model<ISolution>("Solution", SolutionSchema);
