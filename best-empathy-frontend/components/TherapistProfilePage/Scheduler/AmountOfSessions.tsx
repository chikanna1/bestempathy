import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faArrowRight,
  faArrowLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function AmountOfSessions({
  therapist,
  recurringSessions,
  setRecurringSessions,
  selectSpecificTimes,
  setSelectSpecificTimes,
  oneSession,
  setOneSession,
  fiveSessions,
  setFiveSessions,
}) {
  const feeFiveSessions = therapist.sessionFee * 0.9;

  return (
    <div className="flex flex-row justify-center space-x-10">
      <div className="flex flex-col">
        <div className={`w-[70%]`}>
          <p className="text-[25px] font-semibold mb-10 text-center">
            Scheduling Method
          </p>
          <div
            className={
              `cursor-pointer border-b-[5px] ` +
              (recurringSessions
                ? `border-gray-500`
                : `text-gray-700 border-white`)
            }
            onClick={() => {
              setRecurringSessions(!recurringSessions);
              setSelectSpecificTimes(false);
            }}
          >
            <p className={`text-[20px]`}>Recurring</p>
            <p className="my-5 text-[15px]">
              Have sessions on a regular schedule for a set amount of time
              (Recommended)
            </p>
          </div>
        </div>
        <div
          className={
            `mt-[10%] w-[70%] cursor-pointer border-b-[5px] ` +
            (selectSpecificTimes
              ? `border-gray-500 `
              : `text-gray-700 border-white`)
          }
          onClick={() => {
            setSelectSpecificTimes(!selectSpecificTimes);
            setRecurringSessions(false);
          }}
        >
          <p className="my-5 text-[20px]">Select Specific Times</p>
          <p className="my-5 text-[15px]">
            Have Sessions at the times that works for you.
          </p>
        </div>
      </div>
      <div>
        <p className="text-[25px] font-semibold mb-10 text-center">
          Number of Sessions & Price
        </p>

        {!recurringSessions && !selectSpecificTimes ? (
          <div>
            <p className="text-[20px] mb-4">Choose a Scheduling Method</p>
          </div>
        ) : (
          <div></div>
        )}

        {recurringSessions ? (
          <div>
            <p className="text-[20px] mb-4">
              Custom Amount:
              <span className="mx-[20px]">${therapist.sessionFee}</span>
            </p>
            <span className="text-[14px] p-2 bg-red-300 rounded-md">
              10% off when booking 5 or more sessions
            </span>
          </div>
        ) : (
          <div></div>
        )}
        {selectSpecificTimes ? (
          <div>
            <div
              className="flex flex-row cursor-pointer"
              onClick={() => {
                setOneSession(!oneSession);
                setFiveSessions(false);
              }}
            >
              {/* Radio Button */}
              <div className="border-[2px] border-black rounded-full p-[15px] w-[25px] h-[25px] flex items-center justify-center mr-5">
                <FontAwesomeIcon
                  className={
                    `my-1 ` + (oneSession ? `text-black` : `text-white`)
                  }
                  icon={faCircle}
                  size="1x"
                />
              </div>

              <p className="text-[20px] mb-4">
                1 Sessions:
                <span className="mx-[20px]">${therapist.sessionFee}</span>
              </p>
            </div>
            <div
              className="flex flex-row cursor-pointer"
              onClick={() => {
                setOneSession(false);
                setFiveSessions(!fiveSessions);
              }}
            >
              {/* Radio Button */}
              <div className="border-[2px] border-black rounded-full p-[15px] w-[25px] h-[25px] flex items-center justify-center mr-5">
                <FontAwesomeIcon
                  className={
                    `my-1 ` + (fiveSessions ? `text-black` : `text-white`)
                  }
                  icon={faCircle}
                  size="1x"
                />
              </div>

              <p className="text-[20px] mb-4">
                5 Sessions:
                <span className="mx-[20px]">${therapist.sessionFee}</span>
                <span className="text-[14px] p-2 bg-red-300 rounded-md">
                  10% off
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
