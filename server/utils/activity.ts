import { Activity } from "../models/activity.model.ts";

export const logActivity = async (
  userId: string,
  type: string,
  targetModel: string,
  targetId: string,
  message: string
) => {
  await Activity.create({ user: userId, type, targetModel, targetId, message });
};

