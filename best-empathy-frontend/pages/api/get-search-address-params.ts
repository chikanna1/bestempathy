import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, latitude, longitude } = JSON.parse(req.body);

  const data = getSearchComponents(address, latitude, longitude);

  console.log(data);

  res.status(data.status).json({ message: data.message });
}

const getSearchComponents = (
  address: { address_components: any[] },
  latitude: any,
  longitude: any
) => {
  let addressObjectForSearch = {
    country: null,
    city: null,
    state: null,
    latitude: latitude,
    longitude: longitude,
  };

  try {
    address.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("country")) {
        addressObjectForSearch.country = value;
      }
      if (types.includes("locality")) {
        addressObjectForSearch.city = value;
      }
      if (types.includes("administrative_area_level_2")) {
        addressObjectForSearch.state = value;
      }
      if (types.includes("administrative_area_level_1")) {
        addressObjectForSearch.state = value;
      }
    });

    return {
      status: 200,
      message: addressObjectForSearch,
    };
  } catch (error) {
    return {
      status: 500,
      message: { error: "Invalid Address" },
    };
  }
};
