import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  openLibraryId: string;
  title: string;
  authors: string[];
  cover: string;
  description?: string;
  publishedYear?: string | number;
  genres: string[];
}

const bookSchema = new Schema<IBook>(
  {
    openLibraryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: {
      type: [String],
      default: ["Unknown Author"],
    },
    cover: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    publishedYear: {
      type: String,
      default: "",
    },
    genres: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
