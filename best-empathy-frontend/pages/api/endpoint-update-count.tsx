import { API_URL } from "../../config";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, countToBeUpdated } = JSON.parse(req.body);

  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const getCountRes = await fetch(
    `${API_URL}/api/profiles/?filters[slug][$eq]=${slug}&fields[0]=${countToBeUpdated}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const getCountAmount = await getCountRes.json();

  console.log(getCountAmount);

  if (!getCountRes.ok) {
    console.log("Something Went Wrong");
    res.status(500).json({ message: "Something Went Wrong..." });
    return res;
  }

  const profileId = getCountAmount.data[0].id;

  const currentCountNumber =
    getCountAmount.data[0].attributes[countToBeUpdated];

  // Add One to Number of Profile Views Now

  const newCountNumber = currentCountNumber + 1;

  var data = {};
  data[countToBeUpdated] = newCountNumber;

  var payload = JSON.stringify({
    data,
  });

  const updateCountAmountRes = await fetch(
    `${API_URL}/api/profiles/${profileId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },

      body: payload,
    }
  );

  if (!updateCountAmountRes.ok) {
    console.log("Something Went Wrong");
    res.status(500).json({ message: "Something Went Wrong..." });
    return res;
  }

  res.status(200).json({ message: `Succesfully Updated ${countToBeUpdated}` });
  return res;
}
