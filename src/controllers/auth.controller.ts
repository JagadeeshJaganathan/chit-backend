import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    console.log("LOGIN BODY:", req.body);
    const { username, password } = req.body;

    // 👑 ADMIN
    if (username === "klmadmin" && password === "klmchitadmin") {
      const token = jwt.sign({ userId: "admin123", role: "admin" }, "secret", {
        expiresIn: "1d",
      });

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
    if (username === "klmchitmem" && password === "klmchit") {
      const token = jwt.sign(
        { userId: "member123", role: "member" },
        "secret",
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
