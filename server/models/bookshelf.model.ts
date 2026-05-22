import mongoose, { Schema, Document, Types } from "mongoose";

export type ShelfStatus = "want_to_read" | "currently_reading" | "finished";

export interface IBookshelfEntry extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  status: ShelfStatus;
  progress: number;
  notes?: string;
  startDate?: Date;
  finishDate?: Date;
}

const bookshelfSchema = new Schema<IBookshelfEntry>(
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
    },

    status: {
      type: String,
      enum: ["want_to_read", "currently_reading", "finished"],
      default: "want_to_read",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    notes: {
      type: String,
      default: "",
    },

    startDate: Date,
    finishDate: Date,
  },
  {
    timestamps: true,
  }
);

export const BookshelfEntry = mongoose.model<IBookshelfEntry>(
  "BookshelfEntry",
  bookshelfSchema
);
