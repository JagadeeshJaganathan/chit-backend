import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME || "klmadmin";
    const adminPassword = process.env.ADMIN_PASSWORD || "klmchitadmin";
    const memberUsername = process.env.MEMBER_USERNAME || "klmchitmem";
    const memberPassword = process.env.MEMBER_PASSWORD || "klmchit";
    const jwtSecret = process.env.JWT_SECRET || "development-secret";

    // 👑 ADMIN
    if (username === adminUsername && password === adminPassword) {
      const token = jwt.sign(
        { userId: "admin123", role: "admin" },
        jwtSecret,
        {
          expiresIn: "1d",
        },
      );

      return res.json({
        token,
        user: {
          name: "Admin",
          username: "klmadmin",
          role: "admin",
        },
      });
    }

    // 👤 MEMBER
    if (username === memberUsername && password === memberPassword) {
      const token = jwt.sign(
        { userId: "member123", role: "member" },
        jwtSecret,
        { expiresIn: "1d" },
      );

      return res.json({
        token,
        user: {
          name: "Member",
          username: "klmchitmem",
          role: "member",
        },
      });
    }

    // ❌ INVALID
    return res.status(400).json({
      message: "Invalid username or password",
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ error });
  }
};
