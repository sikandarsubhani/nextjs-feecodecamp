// C:\Users\navee\Desktop\sikandar\Coding\next-app\src\helper\getDataFromToken.ts

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };
    return decodedToken.id;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
