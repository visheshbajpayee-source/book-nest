import mongoose, { Schema, Document, Types } from "mongoose";

export type ListVisibility = "public" | "private";

export interface IReadingList extends Document {
  owner: Types.ObjectId;
  title: string;
  description?: string;
  coverImage?: string;
  books: Types.ObjectId[];
  visibility: ListVisibility;
}

const readingListSchema = new Schema<IReadingList>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

export const ReadingList = mongoose.model<IReadingList>(
  "ReadingList",
  readingListSchema
);
