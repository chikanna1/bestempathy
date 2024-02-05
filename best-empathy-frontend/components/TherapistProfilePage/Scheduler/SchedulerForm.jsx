import React, { FormEvent, useState } from "react";
import Select from "react-select";

import SpecificTimesScheduler from "./SpecificTimesScheduler";
import RecurringScheduler from "./RecurringScheduler";

import AmountOfSessions from "./AmountOfSessions";
import Checkout from "./Checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  parse,
  startOfWeek,
  format,
  startOfToday,
  getTime,
  endOfWeek,
} from "date-fns";

import {
  generateTimeSlots,
  DateRange,
  TimeRange,
  TimeInterval,
  provideDateAdapter,
} from "@gund/time-slots";

import { dateFnsAdapter } from "@gund/time-slots/date-adapter/date-fns";

provideDateAdapter(dateFnsAdapter);

const SchedulerForm = ({ therapist }) => {
  // Scheduler Props
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let [currentWeek, setCurrentWeek] = useState(format(today, "MMM-yyyy-dd"));
  let firstDayCurrentWeek = startOfWeek(
    parse(currentWeek, "MMM-yyyy-dd", new Date())
  );
  let lastDayCurrentWeek = endOfWeek(
    parse(currentWeek, "MMM-yyyy-dd", new Date())
  );

  let [selectedMeetingTimes, setSelectedMeetingTimes] = useState([]);
  let [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  let [selectedRecurringTimeSlots, setSelectedRecurringTimeSlots] = useState(
    []
  );

  const generateFirstTimeSlots = () => {
    const slots = generateTimeSlots(
      DateRange.fromDates(selectedDay, today),
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

  const createFirstRecurringTimeSlots = () => {
    const morningTimeSlots = [];
    const eveningTimeSlots = [];

    const slotsMorningObj = generateTimeSlots(
      DateRange.fromDates(selectedDay, today),
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
      DateRange.fromDates(selectedDay, today),
      TimeRange.fromTimeStrings("12:00", "23:00"),
      TimeInterval.minutes(60)
    );

    const slotsMidnight = generateTimeSlots(
      DateRange.fromDates(selectedDay, today),
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

    return {
      morning: morningTimeSlots,
      evening: eveningTimeSlots,
    };
  };

  let [todaysTimeSlots, setTodaysTimeSlots] = useState(generateFirstTimeSlots);
  let [todaysRecurringTimeSlots, setTodaysRecurringTimeSlots] = useState(
    createFirstRecurringTimeSlots
  );

  let [selectedRecurringDayTimeSlots, setSelectedRecurringDayTimeSlots] =
    useState(createFirstRecurringTimeSlots());

  // Form Variables
  const [step, setStep] = useState(1);
  const stepText = ["Session Options", "Schedule Your Sessions", "Payment"];
  const [sessionPrice, setSessionPrice] = useState(0);

  const [schedulingMethod, setSchedulingMethod] = useState("recurring");
  const [clientPrice, setClientPrice] = useState(0);

  const [recurringSessions, setRecurringSessions] = useState(false);
  const [selectSpecificTimes, setSelectSpecificTimes] = useState(false);
  const [numberOfSessions, setNumberOfSessions] = useState(0);
  const [oneSession, setOneSession] = useState(false);
  const [fiveSessions, setFiveSessions] = useState(false);
  const nextStep = () => {
    if (step == 1) {
      if (!recurringSessions && !selectSpecificTimes) {
        toast.error("Please Choose A Scheduling Method");
        return;
      }

      if (selectSpecificTimes) {
        if (!oneSession && !fiveSessions) {
          toast.error("Choose Amount Of Sessions");
          return;
        }
      }
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <ToastContainer limit={1} />

      {/* Navigation */}
      <div className="flex justify-between mx-[10%] lg:mx-[25%] mt-[2.5%] mb-[5%]">
        {step != 1 ? (
          <button
            className="w-[90px] h-[50px] bg-orange-900 text-white rounded-md uppercase font-semibold"
            onClick={prevStep}
          >
            Prev
          </button>
        ) : (
          <div className="w-[90px] h-[50px]"></div>
        )}
        <div className="flex flex-col items-center cursor-pointer">
          <p className="my-1 rounded-[100%] p-3 text-white bg-blue-gray-500 w-[50px] h-[50px] text-center my-auto">
            {step}
          </p>
          <p className="border-b-2 text-[0.85rem] md:text-[1rem]">
            {stepText[step - 1]}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <button
            className="w-[90px] h-[50px] bg-orange-900 text-white rounded-md uppercase font-semibold"
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
      {(() => {
        switch (step) {
          case 1:
            return (
              <AmountOfSessions
                therapist={therapist}
                recurringSessions={recurringSessions}
                setRecurringSessions={setRecurringSessions}
                selectSpecificTimes={selectSpecificTimes}
                setSelectSpecificTimes={setSelectSpecificTimes}
                oneSession={oneSession}
                setOneSession={setOneSession}
                fiveSessions={fiveSessions}
                setFiveSessions={setFiveSessions}
              />
            );
          case 2:
            if (selectSpecificTimes && !recurringSessions) {
              return (
                <SpecificTimesScheduler
                  therapist={therapist}
                  selectedTimeSlots={selectedTimeSlots}
                  today={today}
                  currentWeek={currentWeek}
                  setCurrentWeek={setCurrentWeek}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  lastDayCurrentWeek={lastDayCurrentWeek}
                  setSelectedMeetingTimes={setSelectedMeetingTimes}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  firstDayCurrentWeek={firstDayCurrentWeek}
                  todaysTimeSlots={todaysTimeSlots}
                  setTodaysTimeSlots={setTodaysTimeSlots}
                  numberOfSessions={numberOfSessions}
                  recurringSessions={recurringSessions}
                  selectSpecificTimes={selectSpecificTimes}
                />
              );
            } else {
              return (
                <RecurringScheduler
                  therapist={therapist}
                  selectedTimeSlots={selectedTimeSlots}
                  today={today}
                  currentWeek={currentWeek}
                  setCurrentWeek={setCurrentWeek}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  lastDayCurrentWeek={lastDayCurrentWeek}
                  setSelectedMeetingTimes={setSelectedMeetingTimes}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  firstDayCurrentWeek={firstDayCurrentWeek}
                  todaysTimeSlots={todaysTimeSlots}
                  setTodaysTimeSlots={setTodaysTimeSlots}
                  numberOfSessions={numberOfSessions}
                  recurringSessions={recurringSessions}
                  selectSpecificTimes={selectSpecificTimes}
                  todaysRecurringTimeSlots={todaysRecurringTimeSlots}
                  selectedRecurringDayTimeSlots={selectedRecurringDayTimeSlots}
                  setSelectedRecurringDayTimeSlots={
                    setSelectedRecurringDayTimeSlots
                  }
                  selectedRecurringTimeSlots={selectedRecurringTimeSlots}
                  setSelectedRecurringTimeSlots={setSelectedRecurringTimeSlots}
                />
              );
            }
          case 3:
            return <Checkout />;
        }
      })()}
    </div>
  );
};

export default SchedulerForm;
