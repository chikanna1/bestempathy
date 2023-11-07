import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  setMilliseconds,
  setDate,
  getTime,
  startOfWeek,
  endOfWeek,
  roundToNearestMinutes,
} from "date-fns";
import { Fragment, useState } from "react";

import { dateFnsAdapter } from "@gund/time-slots/date-adapter/date-fns";

import {
  generateTimeSlots,
  DateRange,
  TimeRange,
  TimeInterval,
  provideDateAdapter,
} from "@gund/time-slots";
provideDateAdapter(dateFnsAdapter);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Scheduler({
  therapist,
  today,
  currentWeek,
  setCurrentWeek,
  selectedDay,
  setSelectedDay,
  firstDayCurrentMonth,
  setSelectedMeetingTimes,
  currentMonth,
  setCurrentMonth,
  firstDayCurrentWeek,
  lastDayCurrentWeek,
  selectedTimeSlots,
  todaysTimeSlots,
  setTodaysTimeSlots,
  numberOfSessions,
  recurringSessions,
  selectSpecificTimes,
}) {
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  let daysOfWeek = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: endOfWeek(firstDayCurrentWeek),
  });

  const createTimeSlots = (day) => {
    if (isBefore(day, today)) {
      return;
    }
    setSelectedDay(day);
    const slots = generateTimeSlots(
      DateRange.fromDates(day, day),
      TimeRange.fromTimeStrings("9:00", "17:30"),
      TimeInterval.minutes(60)
    );

    const timeslots = [];

    slots.map((slot) => {
      let meetingTime = {
        ...slot,
        selected: false,
        id: getTime(slot.from),
      };
      timeslots.push(meetingTime);
    });
    // Now slots will contain array of `TimeRange`
    // between 15.11.2020 to 20.11.2020
    // with every day from 9am till 5:30pm
    var res = timeslots.map(
      (obj) => selectedTimeSlots.find((o) => o.id === obj.id) || obj
    );
    console.log(res);
    console.log(selectedTimeSlots);
    setTodaysTimeSlots(res);
  };

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousWeek() {
    let firstDayNextWeek = add(firstDayCurrentWeek, { days: -7 });
    console.log(firstDayNextWeek);
    setCurrentWeek(format(firstDayNextWeek, "MMM-yyyy-dd"));
    console.log(currentWeek);
  }

  function nextWeek() {
    let firstDayNextWeek = add(firstDayCurrentWeek, { days: 7 });
    setCurrentWeek(format(firstDayNextWeek, "MMM-yyyy-dd"));
  }

  const selectTimeSlot = (timeslot) => {
    const newTimeSlots = todaysTimeSlots.map((timeSlot) => {
      if (timeSlot.id !== timeslot.id) {
        return timeSlot;
      } else {
        return {
          ...timeslot,
          selected: !timeslot.selected,
        };
      }
    });

    setTodaysTimeSlots(newTimeSlots);

    const objWithIdIndex = selectedTimeSlots.findIndex(
      (obj) => obj.id === timeslot.id
    );

    if (objWithIdIndex > -1) {
      selectedTimeSlots.splice(objWithIdIndex, 1);
    } else {
      selectedTimeSlots.push({ ...timeslot, selected: true });
    }
    console.log(selectedTimeSlots);
  };

  return (
    <div>
      {/* Mobile Format */}
      <div className="lg:hidden">
        <div className="">
          <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
            <div className="md:divide-gray-200 flex-col justify-center">
              <div className="">
                <div className="flex flex-row items-center text-center justify-between mx-[5%] md:mx-[10%]">
                  <div>
                    <button
                      type="button"
                      onClick={previousWeek}
                      className="-my-1.5 flex  items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                      <ChevronLeftIcon
                        className="w-10 h-10"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-[20px]">
                      {"Week of " +
                        format(firstDayCurrentWeek, "MMMM dd") +
                        " - " +
                        format(lastDayCurrentWeek, "MMMM dd")}
                    </h2>
                  </div>
                  <div>
                    <button
                      onClick={nextWeek}
                      type="button"
                      className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Next Week</span>
                      <ChevronRightIcon
                        className="w-10 h-10"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                  {daysOfWeek.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        "py-1.5"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => createTimeSlots(day)}
                        className={classNames(
                          isEqual(day, selectedDay) && "text-white",
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "text-red-500",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            isSameMonth(day, firstDayCurrentWeek) &&
                            isAfter(day, today) &&
                            "text-gray-900",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentWeek) &&
                            "text-gray-400",
                          isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "bg-red-500",
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            "bg-gray-900",
                          !isEqual(day, selectedDay) && "hover:bg-gray-200",
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            "font-semibold",
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                          isBefore(day, today) && "hidden"
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <section className="mt-4 md:mt-0 md:pl-14">
                <h2 className="font-semibold text-gray-900 text-center">
                  Therapy Session Slots -{" "}
                  <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "MMM dd, yyy")}
                  </time>
                  <div className="grid grid-cols-4 gap-4 mx-auto my-auto mt-5">
                    {todaysTimeSlots.map((timeslot) => (
                      <div
                        className={
                          timeslot.selected
                            ? `px-2 py-2 bg-gray-500 rounded-xl cursor-pointer`
                            : "px-2 py-2 bg-blue-gray-400 rounded-xl cursor-pointer"
                        }
                        key={timeslot.id}
                        onClick={() => selectTimeSlot(timeslot)}
                      >
                        <p className="text-center text-[0.75rem] md:text-[1rem] lg:text-[1.15rem]">
                          {format(new Date(timeslot.from), "hh:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                </h2>
              </section>
              {/* Therapy Slots Selected */}
              <section className="pl-4 md:pl-14">
                <p className="text-[1rem] font-bold mt-3 text-center">
                  Therapy Session Times Selected:
                </p>
                {selectedTimeSlots.map((selectedTimeSlot) => (
                  <div
                    className="flex flex-row items-center space-x-2 justify-center"
                    key={selectedTimeSlot.id}
                  >
                    <div className="py-1 text-white rounded-md my-1 px-[10px] bg-blue-gray-500 w-[275px] h-[30px] md:">
                      <p className="text-center text-[0.75rem] md:text-[1rem] lg:text-[1.15rem]">
                        {format(
                          new Date(selectedTimeSlot.from),
                          "eeee MMMM dd '-' hh:mm a "
                        ) +
                          format(
                            roundToNearestMinutes(
                              new Date(selectedTimeSlot.to),
                              {
                                nearestTo: 30,
                                roundingMethod: "trunc",
                              }
                            ),
                            "' to 'hh:mm a"
                          )}
                      </p>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => selectTimeSlot(selectedTimeSlot)}
                    >
                      <FontAwesomeIcon
                        className="mr-3 text-red-500 w-[50%]"
                        icon={faCircleXmark}
                        size="2x"
                      />
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Format */}
      <div className="hidden lg:flex flex-row justify-center">
        <div className="w-[50vw] h-[500px]">
          <div className=" px-4 mx-auto sm:px-7  md:px-6 w-[100%]">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
              <div className="md:pr-14">
                <div className="flex items-center">
                  <h2 className="flex-auto font-semibold text-gray-900 text-[1.5rem]">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-7 mt-10 text-md leading-[3rem] text-center text-gray-500">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-[1.2rem]">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        "py-2.5"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => createTimeSlots(day)}
                        className={classNames(
                          isEqual(day, selectedDay) && "text-white",
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "text-red-500",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            isSameMonth(day, firstDayCurrentMonth) &&
                            "text-gray-900",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            "text-gray-400",
                          isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "bg-red-500",
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            "bg-gray-900",
                          !isEqual(day, selectedDay) && "hover:bg-gray-200",
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            "font-semibold",
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                          isBefore(day, today) && "hidden"
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <section className="mt-12 md:mt-0 md:pl-14">
                <h2 className="font-semibold text-gray-900 text-center text-[1.2rem]">
                  Therapy Session Slots -{" "}
                  <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "MMM dd, yyy")}
                  </time>
                  <div className="grid grid-cols-3 gap-4 mx-auto my-auto mt-5">
                    {todaysTimeSlots.map((timeslot) => (
                      <div
                        className={
                          timeslot.selected
                            ? `px-2 py-2 bg-gray-500 rounded-xl cursor-pointer`
                            : "px-2 py-2 bg-blue-gray-400 rounded-xl cursor-pointer"
                        }
                        key={timeslot.id}
                        onClick={() => selectTimeSlot(timeslot)}
                      >
                        <p className="text-center">
                          {format(new Date(timeslot.from), "HH:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                </h2>
                <div className="grid grid-cols-4 gap-10"></div>
              </section>
            </div>
          </div>
        </div>
        {/* Chosen Slots - Desktop */}
        <div className="border-l-[1px] ">
          <div className="pl-4 md:pl-14 mt-[-5px]">
            <h2 className="text-[1.2rem]  text-center mb-5 font-semibold">
              Therapy Session Times Selected:
            </h2>
            {selectedTimeSlots.map((selectedTimeSlot) => (
              <div
                className="flex flex-row items-center space-x-2 justify-center my-2"
                key={selectedTimeSlot.id}
              >
                <div className="py-[10px] text-white rounded-md my-1 px-[10px] bg-blue-gray-500 w-full  md:">
                  <p className="text-center text-[0.75rem] md:text-[1rem] lg:text-[1.15rem]">
                    {format(
                      new Date(selectedTimeSlot.from),
                      "eeee MMMM dd '-' hh:mm a "
                    ) +
                      format(
                        roundToNearestMinutes(new Date(selectedTimeSlot.to), {
                          nearestTo: 30,
                          roundingMethod: "trunc",
                        }),
                        "' to 'hh:mm a"
                      )}
                  </p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => selectTimeSlot(selectedTimeSlot)}
                >
                  <FontAwesomeIcon
                    className="mr-3 text-red-500 w-[50%]"
                    icon={faCircleXmark}
                    size="2x"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
