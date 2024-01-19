import React from "react";

export default function ({
  qualificationsObj,
  updateQueryRef,
  filtersQueryJSON,
  qualificationsFilter,
  setQualificationsFilter,
}) {
  return (
    <div>
      {/* Credentials*/}

      <div className="my-[50px]">
        <div className=" border-b-2">
          <p className="text-[18px] mb-1 mt-2 text-center font-bold">
            Qualification Preference
          </p>
        </div>{" "}
        {qualificationsObj.map((qualification, index) => (
          <div className="max-w-[350px] my-3" key={index}>
            <div
              className="flex flex-row cursor-pointer text-[16px]"
              key={index}
              onClick={(event) => [
                updateQueryRef("classification", [qualification.value]),
              ]}
            >
              <input
                type="radio"
                value={qualification.label}
                name="qualificationFilter"
                className="w-[28px]"
                defaultChecked={
                  qualification.value === filtersQueryJSON["classification"][0]
                }
                onClick={setQualificationsFilter([qualification.value])}
                checked={qualification.value === qualificationsFilter[0]}
              />
              <p className="ml-3">{qualification.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
