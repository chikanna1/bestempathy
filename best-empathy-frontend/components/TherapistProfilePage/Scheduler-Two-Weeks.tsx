import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  setMilliseconds,
  setDate,
  getTime,
  startOfWeek,
  endOfWeek,
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

export default function Example() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentWeek, setCurrentWeek] = useState(format(today, "MMM-yyyy-dd"));
  let firstDayCurrentWeek = startOfWeek(
    parse(currentWeek, "MMM-yyyy-dd", new Date())
  );

  console.log(firstDayCurrentWeek);

  let [selectedMeetingTimes, setSelectedMeetingTimes] = useState([]);

  let days = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: endOfWeek(firstDayCurrentWeek),
  });

  const generateFirstTimeSlots = () => {
    const slots = generateTimeSlots(
      DateRange.fromDates(today, today),
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
    return timeslots;
  };
  let [todaysTimeSlots, setTodaysTimeSlots] = useState(generateFirstTimeSlots);

  let [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

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

  const addMeetingTime = (timeslot) => {
    // Check if Trying

    timeslot.selected = true;

    selectedMeetingTimes.push(timeslot);

    alert(selectedMeetingTimes.length + "meetings added");
  };

  const selectTimeSlot = (timeslot) => {
    const newTimeSlots = todaysTimeSlots.map((timeSlot) => {
      if (timeSlot.id !== timeslot.id) {
        return timeSlot;
      } else {
        return {
          ...timeSlot,
          selected: true,
        };
      }
    });

    setTodaysTimeSlots(newTimeSlots);

    var index = selectedTimeSlots.findIndex((x) => x.id === timeslot.id);

    index === -1
      ? selectedTimeSlots.push({ ...timeslot, selected: true })
      : console.log("object already exists");
  };

  return (
    <div className="">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:divide-gray-200 flex-col justify-center">
          <div className="">
            <div className="flex-col items-center text-center">
              <h2 className="flex-auto font-semibold text-gray-900 text-[20px]">
                {"Week of " + format(firstDayCurrentWeek, "MMMM dd - yyyy")}
              </h2>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={previousWeek}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous Week</span>
                  <ChevronLeftIcon className="w-10 h-10" aria-hidden="true" />
                </button>
                <button
                  onClick={nextWeek}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next Week</span>
                  <ChevronRightIcon className="w-10 h-10" aria-hidden="true" />
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
              {days.map((day, dayIdx) => (
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
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentWeek) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
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
                    <p className="text-center">
                      {format(new Date(timeslot.from), "HH:mm")}
                    </p>
                  </div>
                ))}
              </div>
            </h2>
          </section>
        </div>
      </div>
    </div>
  );
}

function MeetingTimes({ meetingtime }) {
  let startDateTime = parseISO(meetingtime.startDatetime);
  let endDateTime = parseISO(meetingtime.endDatetime);

  return <div></div>;
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
