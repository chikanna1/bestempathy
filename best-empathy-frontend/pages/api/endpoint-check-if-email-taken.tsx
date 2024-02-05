import { API_URL } from "../../config";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = JSON.parse(req.body);

  console.log("Checking if " + email + " is taken");
  console.log(email);
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const getCountOfUsersByEmailReq = await fetch(
    `${API_URL}/api/users/count?[email][$eq]=${email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const getCountOfUsersByEmailRes = await getCountOfUsersByEmailReq.json();
  console.log(getCountOfUsersByEmailRes);

  if (getCountOfUsersByEmailRes > 0) {
    res
      .status(500)
      .json({ message: `Email Already In Use...`, statusCode: 500 });
  } else {
    res.status(200).json({ message: `Email Available`, statusCode: 200 });
  }

  return res;
}
