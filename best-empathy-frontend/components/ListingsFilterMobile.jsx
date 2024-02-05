import dynamic from "next/dynamic";
import React from "react";

const DockComponent = dynamic(() =>
  import("react-dock").then((mod) => mod.Dock)
);

export default function ListingsFilterMobile({
  isFiltersOpen,
  setIsFiltersOpen,
  handleSearchSubmit,
  setSearchInput,
  searchInput,
  resetFilters,
  availabilityObj,
  updateQueryList,
  setAvailabilityFilter,
  availabilityFilter,
  genderObj,
  updateRadioInput,
  setGenderChoicesList,
  genderChoicesList,
  demographicsObj,
  setDemographicsFilter,
  demographicsFilter,
  specialtiesObj,
  setSpecialtyChoicesList,
  specialtyChoicesList,
  setLanguagesFilter,
  languagesFilter,
  setTherapyApproachesFilter,
  therapyApproachesFilter,
  religionObj,
  setReligionFilter,
  religionFilter,
  setQualificationsFilter,
  qualificationsFilter,
  qualificationsObj,
  updateSearch,
}) {
  return (
    <div>
      {typeof window !== "undefined" && (
        <DockComponent
          position="left"
          isVisible={isFiltersOpen}
          size={0.75}
          dockStyle={{
            overflowY: "hidden",
            overflow: "hidden",
            overflowAnchor: "none",
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div onClick={() => setIsFiltersOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mx-auto mb-10 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Filters */}
            <div className={`bg-white mt-5 px-3 max-w-[300px]`}>
              {/* Keyword Search */}

              <form onSubmit={handleSearchSubmit}>
                <div>
                  <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={"Search By Keywords"}
                    name="searchInputMobile"
                    value={searchInput}
                    className="w-[100%] rounded-md py-4 px-10 focus:outline-gray-600 focus:bg-white outline outline-2 outline-gray-400 h-[100%]"
                  />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button
                    className="px-2 py-2 bg-mint-tulip-400 rounded-md text-white hover:bg-mint-tulip-600 w-[100%]"
                    onClick={handleSearchSubmit}
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Availability */}

              <div className="my-[50px]">
                <div className=" border-b-2">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Availability
                  </p>
                </div>

                {availabilityFilter.map((availability, index) => (
                  <div className="max-w-[350px] my-3">
                    <div
                      className="flex flex-row cursor-pointer text-[16px]"
                      onClick={() =>
                        updateQueryList(
                          setAvailabilityFilter,
                          availabilityFilter,
                          availability.id,
                          "availability",
                          false
                        )
                      }
                    >
                      <input
                        type="checkbox"
                        name={availability.label}
                        checked={availability.selected}
                        className=" border-gray-300 border-[2px] peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 hover:cursor-default focus:outline-none"
                      />
                      <p className="ml-3">{availability.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gender */}

              <div className="my-[50px]">
                <div className=" border-b-2">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Gender
                  </p>
                </div>
                {genderObj.map((gender, index) => (
                  <div className="max-w-[350px] my-3">
                    <div
                      className="flex flex-row cursor-pointer text-[16px]"
                      onClick={() =>
                        updateRadioInput(
                          setGenderChoicesList,
                          genderChoicesList,
                          [gender.value],
                          "gender",
                          false
                        )
                      }
                    >
                      <input
                        type="radio"
                        value={gender.label}
                        name="genderFilterMobile"
                        className="w-[28px]"
                        checked={gender.value === genderChoicesList[0]}
                      />
                      <p className="ml-3">{gender.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demographics */}

              <div className="my-[50px]">
                <div className=" border-b-2">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Demographic
                  </p>
                </div>{" "}
                {demographicsObj.map((demographic, index) => (
                  <div className="max-w-[350px] my-3">
                    <div
                      className="flex flex-row cursor-pointer text-[16px]"
                      onClick={() =>
                        updateRadioInput(
                          setDemographicsFilter,
                          demographicsFilter,
                          [demographic.value],
                          "demographic",
                          false
                        )
                      }
                    >
                      <input
                        type="radio"
                        value={demographic.label}
                        name="demographicsFilterMobile"
                        className="w-[28px]"
                        checked={demographic.value === demographicsFilter[0]}
                      />
                      <p className="ml-3">{demographic.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Therapy Approaches */}

              <div className="my-[50px]">
                <div className=" border-b-2 my-4">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Type of Therapy
                  </p>
                </div>

                <div className="max-w-[350px] h-[300px] overflow-y-scroll">
                  {specialtiesObj.map((specialty, index) => (
                    <div
                      className="flex flex-row cursor-pointer text-[16px] my-3"
                      onClick={() =>
                        updateRadioInput(
                          setSpecialtyChoicesList,
                          specialtyChoicesList,
                          [specialty.value],
                          "specialty",
                          false
                        )
                      }
                    >
                      <input
                        type="radio"
                        value={specialty.label}
                        name="specialtyChoicesListMobile"
                        className="w-[28px]"
                        checked={specialty.value === specialtyChoicesList[0]}
                      />
                      <p className="ml-3">{specialty.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}

              <div className="my-[50px]">
                <div className=" border-b-2 my-4">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Languages
                  </p>
                </div>
                <div className="max-w-[350px] h-[300px] overflow-y-scroll">
                  {languagesFilter.map((language, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateQueryList(
                            setLanguagesFilter,
                            languagesFilter,
                            language.id,
                            "languages",
                            false
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          name={language.label}
                          checked={language.selected}
                          className=" border-gray-300 border-[2px] peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 hover:cursor-default focus:outline-none"
                        />
                        <p className="ml-3">{language.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Therapy Approaches */}

              <div className="my-[50px]">
                <div className=" border-b-2 my-4">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Approaches
                  </p>
                </div>
                <div className="max-w-[350px] h-[300px] overflow-y-scroll">
                  {therapyApproachesFilter.map((approach, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateQueryList(
                            setTherapyApproachesFilter,
                            therapyApproachesFilter,
                            approach.id,
                            "therapyApproaches",
                            false
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          name={approach.label}
                          checked={approach.selected}
                          className=" border-gray-300 border-[2px] peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 hover:cursor-default focus:outline-none"
                        />
                        <p className="ml-3">{approach.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Religious Preference*/}

              <div className="my-[50px]">
                <div className=" border-b-2">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Religious Preference
                  </p>
                </div>
                {religionObj.map((religion, index) => (
                  <div className="max-w-[350px] my-3">
                    <div
                      className="flex flex-row cursor-pointer text-[16px]"
                      onClick={() =>
                        updateRadioInput(
                          setReligionFilter,
                          religionFilter,
                          [religion.value],
                          "religion",
                          false
                        )
                      }
                    >
                      <input
                        type="radio"
                        value={religion.label}
                        name="religionFilterMobile"
                        className="w-[28px]"
                        checked={religion.value === religionFilter[0]}
                      />
                      <p className="ml-3">{religion.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Credentials*/}

              <div className="my-[50px]">
                <div className=" border-b-2">
                  <p className="text-[18px] mb-1 mt-2 text-center font-bold">
                    Qualification Preference
                  </p>
                </div>{" "}
                {qualificationsObj.map((qualification, index) => (
                  <div className="max-w-[350px] my-3">
                    <div
                      className="flex flex-row cursor-pointer text-[16px]"
                      onClick={() =>
                        updateRadioInput(
                          setQualificationsFilter,
                          qualificationsFilter,
                          [qualification.value],
                          "classification",
                          false
                        )
                      }
                    >
                      <input
                        type="radio"
                        value={qualification.value}
                        name="qualificationFilterMobile"
                        className="w-[28px]"
                        onChange={() => {}}
                        checked={
                          qualification.value === qualificationsFilter[0]
                        }
                      />
                      <p className="ml-3">{qualification.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col  mt-[20px] mb-[40px]">
              {/* Reset Button */}
              <button
                className="px-2 py-1 bg-mint-tulip-400 rounded-md text-white hover:bg-mint-tulip-600"
                onClick={updateSearch}
              >
                Update Search
              </button>
            </div>
            <div className="flex flex-col  mt-[20px] mb-[40px]">
              {/* Reset Button */}
              <button
                className="px-2 py-1 bg-mint-tulip-400 rounded-md text-white hover:bg-mint-tulip-600"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </DockComponent>
      )}
    </div>
  );
}
