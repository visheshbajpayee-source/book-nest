import mongoose, { Schema, Document, Types } from "mongoose";

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  targetModel: string;
  targetId: Types.ObjectId;
  message: string;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    targetModel: {
      type: String,
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
