import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../config";
import { orderByDistance, getDistance, isPointWithinRadius } from "geolib";
import * as qs from "qs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let resultsData = null;
  let entries = null;

  let hasPrevPage = true;
  let hasNextPage = true;

  if (req.method === "POST") {
    const {
      country,
      city,
      state,
      latitude,
      longitude,
      page,
      per_page,
      filters,
    } = req.body.query;

    let filtersObj = {
      therapyApproaches: [],
      languages: [],
      classification: [],
      specialty: [],
      radius: 50,
      searchKeywords: "",
    };

    if (filters) {
      filtersObj = JSON.parse(filters);
    }

    console.log(filtersObj);
    // console.log(country);
    //Country Logic
    //US and Canada - Country and State Logic

    if (country == "United States" || country == "Canada") {
      //Get All  Results from Backend DB for Country and State of Query and Plus Member

      const therapyApproachFiltersArray = filtersObj.therapyApproaches.map(
        (therapyApproach) => ({
          therapy_approaches: { $contains: therapyApproach },
        })
      );

      const languageFiltersArray = filtersObj.languages.map((language) => ({
        languages: { $contains: language },
      }));

      const keywordsFilterArray = [
        {
          bio: { $containsi: filtersObj.searchKeywords.trim() },
        },
        {
          firstName: { $containsi: filtersObj.searchKeywords.trim() },
        },
        {
          lastName: { $containsi: filtersObj.searchKeywords.trim() },
        },
      ];

      const languageFilters = [
        {
          $or: languageFiltersArray,
        },
      ];
      const therapyApproachFilters = [
        {
          $or: therapyApproachFiltersArray,
        },
      ];

      const keywordSearchFilters = [
        {
          $or: keywordsFilterArray,
        },
      ];

      const classificationFilters = filtersObj.classification.map(
        (classification) => ({
          classification: { $contains: classification },
        })
      );

      let specialtyFilters;

      specialtyFilters = filtersObj.specialty.map((specialty) => ({
        specialties: { $contains: specialty },
      }));

      const startingFiltersPlusMembers = [
        {
          country: {
            $eq: country,
          },
          state: {
            $eq: state,
          },
          plusMember: {
            $eq: true,
          },
        },
      ];

      const plusMembersAndFilters = startingFiltersPlusMembers
        .concat(classificationFilters)
        .concat(specialtyFilters)
        .concat(languageFilters)
        .concat(therapyApproachFilters)
        .concat(keywordSearchFilters);

      const queryPlusMembers = qs.stringify(
        {
          filters: {
            $and: plusMembersAndFilters,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const resPlusMembers = await fetch(
        `${API_URL}/api/profiles?${queryPlusMembers}&fields[1]=firstName&fields[2]=lastName&fields[3]=acceptingNewClients&fields[4]=onlineTherapy&fields[5]=bio&fields[6]=specialties&fields[7]=languages&fields[8]=latitude&fields[9]=longitude&fields[10]=city&fields[11]=state&fields[12]=country&fields[13]=classification&fields[14]=title&fields[15]=therapyApproaches&fields[16]=profileImageUrl`
      );
      const plusMemberTherapists = await resPlusMembers.json();

      //Sort Plus Members by Distance
      let sortedPlusMembers;
      if (plusMemberTherapists["meta"].pagination["total"] > 0) {
        const plusMemberTherapistList = plusMemberTherapists.data.map(
          (therapistPlusMemberData: { attributes: any }) => {
            return therapistPlusMemberData.attributes;
          }
        );

        let radiusInMeters;
        if (country == "United States") {
          radiusInMeters = filtersObj.radius * 1.60934 * 1000;
        } else {
          radiusInMeters = filtersObj.radius * 1000;
        }

        const inRadiusPlusMembers = plusMemberTherapistList.filter(
          (plusMember) => {
            if (
              isPointWithinRadius(
                { latitude: latitude, longitude: longitude },
                {
                  latitude: plusMember.latitude,
                  longitude: plusMember.longitude,
                },
                radiusInMeters
              )
            )
              return plusMember;
          }
        );

        sortedPlusMembers = orderByDistance(
          { latitude: latitude, longitude: longitude },
          inRadiusPlusMembers
        );
      } else {
        sortedPlusMembers = [];
      }

      //Get All  Results from Backend DB for Country and State of Query and Regular Member

      const startingFiltersRegularMembers = [
        {
          country: {
            $eq: country,
          },
          state: {
            $eq: state,
          },
          plusMember: {
            $eq: false,
          },
        },
      ];

      const regularMembersAndFilters = startingFiltersRegularMembers
        .concat(classificationFilters)
        .concat(specialtyFilters)
        .concat(languageFilters)
        .concat(therapyApproachFilters)
        .concat(keywordSearchFilters);

      const queryRegularMembers = qs.stringify(
        {
          filters: {
            $and: regularMembersAndFilters,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      console.log("Test Regular Query");

      // console.log(
      //   `/api/profiles?${queryRegularMembers}&fields[1]=firstName&fields[2]=lastName&fields[3]=acceptingNewClients&fields[4]=onlineTherapy&fields[5]=bio&fields[6]=specialties&fields[7]=languages&fields[8]=latitude&fields[9]=longitude&fields[10]=city&fields[11]=state&fields[12]=country&fields[13]=classification&fields[14]=title&fields[15]=therapyApproaches&fields[16]=profileImageUrl`
      // );

      const resRegularMembers = await fetch(
        `${API_URL}/api/profiles?${queryRegularMembers}&fields[1]=firstName&fields[2]=lastName&fields[3]=acceptingNewClients&fields[4]=onlineTherapy&fields[5]=bio&fields[6]=specialties&fields[7]=languages&fields[8]=latitude&fields[9]=longitude&fields[10]=city&fields[11]=state&fields[12]=country&fields[13]=classification&fields[14]=title&fields[15]=therapyApproaches&fields[16]=profileImageUrl`
      );
      const regularMemberTherapists = await resRegularMembers.json();

      //Sort Regular Members by Distance
      let sortedRegularMembers;
      //Sort Plus Members by Distance
      if (regularMemberTherapists["meta"].pagination["total"] > 0) {
        const regularMemberTherapistList = regularMemberTherapists.data.map(
          (therapistRegularMemberData: { attributes: any }) => {
            return therapistRegularMemberData.attributes;
          }
        );

        let radiusInMeters;
        if (country == "United States") {
          radiusInMeters = filtersObj.radius * 1.60934 * 1000;
        } else {
          radiusInMeters = filtersObj.radius * 1000;
        }

        const inRadiusRegularMembers = regularMemberTherapistList.filter(
          (regularMember) => {
            if (
              isPointWithinRadius(
                { latitude: latitude, longitude: longitude },
                {
                  latitude: regularMember.latitude,
                  longitude: regularMember.longitude,
                },
                radiusInMeters
              )
            )
              return regularMember;
          }
        );

        sortedRegularMembers = orderByDistance(
          { latitude: latitude, longitude: longitude },
          inRadiusRegularMembers
        );
      } else {
        sortedRegularMembers = [];
      }

      //Aggregate Lists and Send Results Back/Pagination

      entries = sortedPlusMembers.concat(sortedRegularMembers);

      const start = (Number(page) - 1) * Number(2); // 0, 5, 10 ...
      const end = start + Number(2); // 5, 10, 15 ...
      resultsData = entries.slice(start, end);

      if (start == 0 || entries.length == 0) {
        hasPrevPage = false;
      }

      if (end >= entries.length || entries.length == 0) {
        hasNextPage = false;
      }
    }

    //If Not US/Canada
    else {
      //Get All  Results from Backend DB for Country of Query and Plus Member
      //Get All  Results from Backend DB for Country of Query and Regular Member
      //Sort Plus Members Results
      //Sort Regular Members Results
      //Aggregate Lists and Send Results Back/Pagination
    }

    res.status(200).json({ resultsData, hasPrevPage, hasNextPage });
  }
}
