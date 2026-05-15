import type { Request, Response } from "express";
import bcrypt from "bcrypt";

const createUser = async ( req: Request, res: Response) => {
  try {
    const { name, userName, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // save user to db
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};