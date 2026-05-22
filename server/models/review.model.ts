import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  rating: number;
  text: string;
  likes: Types.ObjectId[];
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
