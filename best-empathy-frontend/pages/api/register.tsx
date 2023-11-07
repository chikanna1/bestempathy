import { API_URL } from "../../config";
import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      title,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      formattedAddress,
      classification,
      professionalTitle,
      membershipType,
      city,
      country,
      state,
      coordinates,
    } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: email,
        phoneNumber: phoneNumber,
        address: address,
        formattedAddress: formattedAddress,
        classification: classification,
        professionalTitle: professionalTitle,
        membershipType: membershipType,
        city: city,
        state: state,
        country: country,
        coordinates: coordinates,
      }),
    });

    try {
      const data = await strapiRes.json();
      if (strapiRes.statusText === "OK") {
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
        res.status(200).json({ user: data.user });
      } else {
        res.status(data.error.status).json({
          message: data.error.message,
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
