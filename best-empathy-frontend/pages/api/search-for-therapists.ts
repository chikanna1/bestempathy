import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../config";
import { orderByDistance } from "geolib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let resultsData = null;
  if (req.method === "POST") {
    const { country, city, state, latitude, longitude } = req.body.query;

    //Country Logic

    //US and Canada - Country and State Logic

    if (country == "United States" || country == "Canada") {
      //Get All  Results from Backend DB for Country and State of Query and Plus Member
      const resPlusMembers = await fetch(
        `${API_URL}/api/profiles?filters[country][$eq]=${country}&filters[state][$eq]=${state}&filters[plusMember][$eq]=true&fields[1]=firstName&fields[2]=lastName&fields[3]=acceptingNewClients&fields[4]=onlineTherapy&fields[5]=bio&fields[6]=specialties&fields[7]=languages&fields[8]=latitude&fields[9]=longitude&fields[10]=city`
      );
      const plusMemberTherapists = await resPlusMembers.json();

      const plusMemberTherapistList = plusMemberTherapists.data.map(
        (therapistPlusMemberData: { attributes: any }) => {
          return therapistPlusMemberData.attributes;
        }
      );

      //Sort Plus Members by Distance
      const sortedPlusMembers = orderByDistance(
        { latitude: latitude, longitude: longitude },
        plusMemberTherapistList
      );

      //Get All  Results from Backend DB for Country and State of Query and Regular Member
      const resRegularMembers = await fetch(
        `${API_URL}/api/profiles?filters[country][$eq]=${country}&filters[state][$eq]=${state}&filters[plusMember][$eq]=false&fields[1]=firstName&fields[2]=lastName&fields[3]=acceptingNewClients&fields[4]=onlineTherapy&fields[5]=bio&fields[6]=specialties&fields[7]=languages&fields[8]=latitude&fields[9]=longitude&fields[10]=city`
      );
      const regularMemberTherapists = await resRegularMembers.json();

      const regularMemberTherapistList = regularMemberTherapists.data.map(
        (therapistRegularMemberData: { attributes: any }) => {
          return therapistRegularMemberData.attributes;
        }
      );

      //Sort Regular Members Results

      const sortedRegularMembers = orderByDistance(
        { latitude: latitude, longitude: longitude },
        regularMemberTherapistList
      );
      //Aggregate Lists and Send Results Back/Pagination

      resultsData = sortedPlusMembers.concat(sortedRegularMembers);
    }

    //If Not US/Canada
    else {
      //Get All  Results from Backend DB for Country of Query and Plus Member
      //Get All  Results from Backend DB for Country of Query and Regular Member
      //Sort Plus Members Results
      //Sort Regular Members Results
      //Aggregate Lists and Send Results Back/Pagination
    }

    res.status(200).json({ resultsData });
  }
}
