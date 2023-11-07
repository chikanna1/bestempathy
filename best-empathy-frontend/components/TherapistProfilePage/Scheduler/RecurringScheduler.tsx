import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  formatInTimeZone,
  format as formatTZ,
  utcToZonedTime,
  zonedTimeToUtc,
} from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import Select from "react-select";

import {
  add,
  addHours,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isAfter,
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
  nextDay,
  addDays,
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

export default function RecurringScheduler({
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
  selectedTimeSlots,
  todaysTimeSlots,
  setTodaysTimeSlots,
  todaysRecurringTimeSlots,
  selectedRecurringDayTimeSlots,
  setSelectedRecurringDayTimeSlots,
  selectedRecurringTimeSlots,
  setSelectedRecurringTimeSlots,
}) {
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  let daysOfWeek = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: endOfWeek(firstDayCurrentWeek),
  });

  const getDaysOfTheWeek = () => {
    const days = daysOfWeek;

    const dayObjArray = [];

    days.map((day) => {
      let dayObj = {};
      if (isToday(day)) {
        dayObj = {
          dayOfWeek: format(day, "eee"),
          dayFormatOfDay: day,
          selected: true,
        };
      } else {
        dayObj = {
          dayOfWeek: format(day, "eee"),
          dayFormatOfDay: day,
          selected: false,
        };
      }
      dayObjArray.push(dayObj);
    });

    return dayObjArray;
  };

  let daysOfWeekObj = getDaysOfTheWeek();

  let [weekDaysArray, setWeekDaysArray] = useState(daysOfWeekObj);

  const createRecurringTimeSlots = (day) => {
    const morningTimeSlots = [];
    const eveningTimeSlots = [];

    const slotsMorningObj = generateTimeSlots(
      DateRange.fromDates(day, day),
      TimeRange.fromTimeStrings("00:00", "12:00"),
      TimeInterval.minutes(60)
    );

    slotsMorningObj.map((slot) => {
      let meetingTime = {
        ...slot,
        selected: false,
        id: getTime(slot.from),
      };
      morningTimeSlots.push(meetingTime);
    });

    const slotsEvening = generateTimeSlots(
      DateRange.fromDates(day, day),
      TimeRange.fromTimeStrings("12:00", "23:00"),
      TimeInterval.minutes(60)
    );

    const slotsMidnight = generateTimeSlots(
      DateRange.fromDates(day, day),
      TimeRange.fromTimeStrings("23:00", "23:59:59"),
      TimeInterval.seconds(59.95 * 60)
    );

    slotsEvening.map((slot) => {
      let meetingTime = {
        ...slot,
        selected: false,
        id: getTime(slot.from),
      };
      eveningTimeSlots.push(meetingTime);
    });

    slotsMidnight.map((slot) => {
      let meetingTime = {
        ...slot,
        selected: false,
        id: getTime(slot.from),
      };
      eveningTimeSlots.push(meetingTime);
    });

    // Find Selected Time Slot Values in new Arrays

    var resMorning = morningTimeSlots.map(
      (obj) => selectedRecurringTimeSlots.find((o) => o.id === obj.id) || obj
    );
    var resEvening = eveningTimeSlots.map(
      (obj) => selectedRecurringTimeSlots.find((o) => o.id === obj.id) || obj
    );

    setSelectedRecurringDayTimeSlots({
      morning: resMorning,
      evening: resEvening,
    });
  };

  function nextWeek() {
    let firstDayNextWeek = add(firstDayCurrentWeek, { days: 7 });
    setCurrentWeek(format(firstDayNextWeek, "MMM-yyyy-dd"));
  }

  const selectTimeSlot = (timeslot, morningOrEvening) => {
    const newTimeSlots = selectedRecurringDayTimeSlots[morningOrEvening].map(
      (timeSlot) => {
        if (timeSlot.id !== timeslot.id) {
          return timeSlot;
        } else {
          return {
            ...timeslot,
            selected: !timeslot.selected,
          };
        }
      }
    );

    if (morningOrEvening == "morning") {
      setSelectedRecurringDayTimeSlots({
        ...selectedRecurringDayTimeSlots,
        morning: newTimeSlots,
      });
    } else {
      setSelectedRecurringDayTimeSlots({
        ...selectedRecurringDayTimeSlots,
        evening: newTimeSlots,
      });
    }

    console.log(selectedRecurringDayTimeSlots);

    const objWithIdIndex = selectedRecurringTimeSlots.findIndex(
      (obj) => obj.id === timeslot.id
    );

    if (objWithIdIndex > -1) {
      selectedRecurringTimeSlots.splice(objWithIdIndex, 1);
    } else {
      selectedRecurringTimeSlots.push({
        ...timeslot,
        selected: true,
        timeOfDay: morningOrEvening,
      });
    }
    console.log(selectedRecurringTimeSlots);
  };

  const selectDay = (selectedDay) => {
    let week = [...weekDaysArray];

    week.map((day) => {
      if (day.dayOfWeek === selectedDay.dayOfWeek) {
        day.selected = true;
      } else {
        day.selected = false;
      }
    });

    setWeekDaysArray(week);
    createRecurringTimeSlots(selectedDay.dayFormatOfDay);
  };

  const convertTimeSlot = (timeslot) => {
    const timeZone = "Europe/Paris";

    const timeFrom = timeslot.from;

    const utcDate = zonedTimeToUtc(timeFrom, timeZone);

    console.log(timeFrom);
    console.log(utcDate);
  };

  const durationOfRecurringSessionsOptions = [
    { value: 4, label: "4 Weeks" },
    { value: 8, label: "8 Weeks" },
    { value: 12, label: "12 Weeks" },
    { value: 16, label: "16 Weeks" },
  ];

  const [durationOfRecurringSessions, setDurationOfRecurringSessions] =
    useState({ value: 4, label: "4 Weeks" });

  const handleInputChangeSelect = (selectedOption, action) => {
    console.log(action.name);
    console.log(selectedOption);
    setDurationOfRecurringSessions(selectedOption);
  };

  return (
    <div>
      <div className="lg:hidden">Recurring Scheduler</div>

      {/* Desktop Version */}
      <div className="hidden lg:flex mx-[10%]">
        {/* WeekDay and TimeSlots Chooser */}
        <div className="w-[35%]">
          <div className="grid grid-cols-7 mt-10  leading-6 text-center text-gray-900 uppercase text-[18px]">
            {weekDaysArray.map((weekday) => (
              <div
                className={
                  `p-2 hover:bg-gray-300 cursor-pointer rounded-md ` +
                  (weekday.selected ? `bg-gray-500` : ``)
                }
                onClick={() => selectDay(weekday)}
              >
                {weekday.dayOfWeek}
              </div>
            ))}
          </div>
          <div>
            <div className="mt-5">
              <p className="text-center text-[15px] text-gray-800 uppercase">
                Morning
              </p>
            </div>
            <div className="grid grid-cols-6 mt-2 w-[100%] place-items-center">
              {selectedRecurringDayTimeSlots.morning.map((timeslot) => (
                <div
                  className={
                    timeslot.selected
                      ? "p-2 m-2 rounded-md bg-yellow-400 cursor-pointer"
                      : "p-2 m-2 rounded-md bg-gray-200  cursor-pointer"
                  }
                  onClick={() => selectTimeSlot(timeslot, "morning")}
                >
                  {format(timeslot.from, "hh:mm")}
                  <span className="text-[12px]">AM</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mt-5">
              <p className="text-center text-[15px] text-gray-800 uppercase">
                Afternoon/Evening
              </p>
            </div>
            <div className="grid grid-cols-6 mt-2 w-[100%] place-items-center">
              {selectedRecurringDayTimeSlots.evening.map((timeslot) => (
                <div
                  className={
                    timeslot.selected
                      ? "p-2 m-2 rounded-md bg-yellow-400  cursor-pointer"
                      : "p-2 m-2 rounded-md bg-gray-200  cursor-pointer"
                  }
                  onClick={() => selectTimeSlot(timeslot, "evening")}
                >
                  {format(timeslot.from, "hh:mm")}
                  <span className="text-[12px]">PM</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Time Slots */}
        <div className="w-[30%] border-l-4 ml-10">
          <div className="mx-[12.5%]">
            <Select
              value={durationOfRecurringSessions}
              onChange={handleInputChangeSelect}
              defaultValue={{ value: 4, label: "4 Weeks" }}
              options={durationOfRecurringSessionsOptions}
              name="title"
              classNames={{
                control: () => "border-[3px] border-gray-300 rounded-md",
              }}
              styles={{
                option: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
                singleValue: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
              }}
            />
          </div>
          <div>
            <p className="text-center text-[18px] mt-10">
              Selected Recurring Session Times
            </p>
            <div className="flex flex-col items-center mt-5">
              {selectedRecurringTimeSlots.map((timeslot) => (
                <div
                  className="flex flex-row items-center space-x-2 justify-end"
                  key={timeslot.id}
                >
                  <div>
                    <p className="font-bold text-[1.2rem]">
                      {durationOfRecurringSessions.value + ` X `}
                    </p>
                  </div>
                  <div className="mt-2 text-white rounded-md my-1 px-[10px] bg-blue-gray-500 py-2">
                    <p className="font-semibold text-[1rem]">
                      {format(timeslot.from, "eeee") +
                        `'s from ` +
                        format(timeslot.from, "hh:mm a") +
                        ` to ` +
                        format(
                          roundToNearestMinutes(new Date(timeslot.to), {
                            nearestTo: 30,
                            roundingMethod: "trunc",
                          }),
                          "' to 'hh:mm a"
                        )}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => selectTimeSlot(timeslot, timeslot.timeOfDay)}
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
        {/* Selected Time Slots */}
        <div className="w-[25%] border-l-4 ml-10">
          <div>
            <p className="text-center text-[18px] mt-10">
              {therapist.firstName + " is available on"}
            </p>
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
