import { API_URL } from "../../config";
import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifier,
        password: password,
      }),
    });

    try {
      const data = await strapiRes.json();
      console.log(data);
      if (strapiRes.ok) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, //One Week
            sameSite: "strict",
            path: "/",
          })
        );
        // @todo Set Cookie
        res.status(200).json({ user: data.user });
      } else {
        res.status(data.error.status).json({
          message: data.error.message,
          // message:
          // "Email/Password Combination Not Valid! Please Check Your Credentials",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong...",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
