import { useEffect, useState } from "react";
import { PickType } from "../DatePicker";
import {
  add,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  isEqual,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  sub,
} from "date-fns";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "../../../utils/fn.utils";

const getAllDayInMonth = (month: Date) => {
  const start = startOfWeek(startOfMonth(month));
  let end = endOfWeek(endOfMonth(month));

  if (!isEqual(sub(startOfDay(end), { days: 41 }), start))
    end = add(end, { weeks: 1 });

  return eachDayOfInterval({ start: start, end: end });
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    };
  },
};

export default function DayPicker({
  value,
  monthInView,
  setValue,
  setPickType,
  setMonthInView,
}: {
  value?: number;
  monthInView: Date;
  setValue: (date: number) => void;
  setPickType: (type: PickType) => void;
  setMonthInView: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [direction, setDirection] = useState<number>(0);

  const days = getAllDayInMonth(monthInView);

  const changeMonth = (num: number) => {
    setDirection(num);
    setMonthInView((prev) => addMonths(prev, num));
  };

  return (
    <div className="w-[296px]">
      <div className="flex items-center justify-center px-2 pb-2">
        <Button
          variant="light"
          color="primary"
          isIconOnly
          radius="full"
          size="sm"
          className="text-large"
          onClick={() => changeMonth(-1)}
        >
          <i className="bi bi-caret-left-fill"></i>
        </Button>
        <Button
          variant="light"
          className="w-36 cursor-pointer text-medium font-medium"
          onClick={() => setPickType("month")}
        >
          {format(monthInView, "MMMM yyyy")}
        </Button>
        <Button
          variant="light"
          color="primary"
          isIconOnly
          radius="full"
          size="sm"
          className="text-large"
          onClick={() => changeMonth(1)}
        >
          <i className="bi bi-caret-right-fill"></i>
        </Button>
      </div>
      <div className="text grid grid-cols-7 rounded-small bg-default-200 text-center text-xs font-medium leading-6 text-primary">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.375,
            }}
            key={monthInView.getTime()}
            className="absolute grid w-[296px] grid-cols-7 text-center text-sm"
          >
            {days.map((date) => (
              <div key={date.toString()} className="p-1">
                <button
                  type="button"
                  className={classNames(
                    !isSameMonth(date, monthInView) && "text-gray-300",
                    isToday(date) &&
                      " bg-default-200 font-bold text-primary-600",
                    !!value &&
                      isEqual(date, new Date(value)) &&
                      " bg-primary-600 text-white",
                    !!value &&
                      !isEqual(date, new Date(value)) &&
                      !isToday(date) &&
                      "hover:bg-gray-100",
                    "flex aspect-square h-full w-full items-center justify-center rounded-full leading-none",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(date.getTime());
                  }}
                >
                  {format(date, "d")}
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
