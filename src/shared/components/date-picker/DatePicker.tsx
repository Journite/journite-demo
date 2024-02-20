import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import {
  add,
  addMonths,
  differenceInMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getMonth,
  isEqual,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { classNames } from "../../utils/fn.utils";
import { modalMotionProps } from "../../utils/style.utils";

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

const getAllDayInMonth = (month: Date) => {
  const start = startOfWeek(startOfMonth(month));
  let end = endOfWeek(endOfMonth(month));

  if (!isEqual(sub(startOfDay(end), { days: 41 }), start))
    end = add(end, { weeks: 1 });

  return eachDayOfInterval({ start: start, end: end });
};

type PickType = "day" | "month" | "year";

export default function DatePicker({
  value,
  setValue,
}: {
  value?: number;
  setValue: (nextDate: number) => void;
}) {
  const [pickType, setPickType] = useState<PickType>("day");
  const [monthInView, setMonthInView] = useState<Date>(
    value ? new Date(value) : new Date(),
  );

  const renderPicker = () => {
    switch (pickType) {
      case "day":
        return (
          <DayPicker
            value={value}
            monthInView={monthInView}
            setValue={setValue}
            setMonthInView={setMonthInView}
            setPickType={setPickType}
          />
        );
      case "month":
        return (
          <MonthPicker
            value={value}
            monthInView={monthInView}
            setValue={setValue}
            setMonthInView={setMonthInView}
            setPickType={setPickType}
          />
        );
      case "year":
    }
  };

  return (
    <>
      <Modal
        size="xs"
        isOpen={true}
        motionProps={modalMotionProps}
        classNames={{
          wrapper: "z-[1000]",
          base: "w-80 h-[312px]",
          backdrop: "z-[999]",
        }}
        hideCloseButton
      >
        <ModalContent>
          <ModalBody className="gap-0 px-3 pb-6">{renderPicker()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function MonthPicker({
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
  const monthList = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  return (
    <>
      <Button
        variant="light"
        color="primary"
        className="grow text-medium font-semibold"
        onClick={() => setPickType("year")}
        startContent={<i className="bi bi-calendar-week"></i>}
      >
        {2024}
      </Button>
      <Divider className="my-2 h-[0.5px]" />
      <div className="grid grid-cols-3 gap-2">
        {monthList.map((month) => (
          <Button
            key={month.getTime()}
            variant="light"
            className={
              value && getMonth(value) === getMonth(month) ? "" : "fw-400"
            }
          >
            {format(month, "MMMM")}
          </Button>
        ))}
      </div>
      <Divider className="my-2 h-[0.5px]" />

      <Button
        color="danger"
        variant="light"
        fullWidth
        onClick={() => setPickType("day")}
        className="fw-400"
      >
        Back
      </Button>
    </>
  );
}

function DayPicker({
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

  useEffect(() => {
    if (value && !isSameMonth(value, monthInView)) {
      setDirection(getMonth(value) - getMonth(monthInView));
      setMonthInView(new Date(value));
    }
  }, [value]);

  return (
    <div className="h-80 w-[296px]">
      <div className="flex items-center justify-center px-2 pb-2">
        <Button
          variant="light"
          disableAnimation
          className="fw-400 absolute left-4 h-fit min-w-0 p-1 text-primary/70 hover:!bg-transparent hover:text-primary hover:underline"
        >
          Unset
        </Button>
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
      <div className="relative h-56 overflow-hidden">
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
              <div key={date.toString()} className="p-0.5">
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
                    "aspect-square h-full rounded-full p-1.5",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(date.getTime());
                  }}
                >
                  <time dateTime={format(date, "yyyy-MM-dd")}>
                    {format(date, "d")}
                  </time>
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
