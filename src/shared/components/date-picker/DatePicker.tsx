import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";
import { modalMotionProps } from "../../utils/style.utils";
import { classNames } from "../../utils/fn.utils";

export default function DatePicker({
  value,
  setDate,
}: {
  value: number;
  setDate: (nextDate: number) => void;
}) {
  const [month, setMonth] = useState<Date>(new Date());
  console.log(month);

  const days = getAllDayInMonth(month);

  //   useEffect(() => {
  //     setMonth(startOfMonth(value));
  //   }, []);

  return (
    <>
      <Modal
        size="xs"
        isOpen={true}
        motionProps={modalMotionProps}
        classNames={{ wrapper: "z-[1000]", base: "w-80", backdrop: "z-[1000]" }}
        hideCloseButton
      >
        <ModalContent>
          <ModalBody className="pb-6 px-3 gap-2">
            <div className="flex justify-between items-center pt-2 px-2">
              <Button
                variant="light"
                color="primary"
                isIconOnly
                radius="full"
                size="sm"
                className="text-large"
                onClick={() => setMonth((prev) => sub(prev, { months: 1 }))}
              >
                <i className="bi bi-caret-left-fill"></i>
              </Button>
              <div className="font-medium cursor-pointer">
                {format(month, "MMMM yyyy")}
              </div>
              <Button
                variant="light"
                color="primary"
                isIconOnly
                radius="full"
                size="sm"
                className="text-large"
                onClick={() => setMonth((prev) => add(prev, { months: 1 }))}
              >
                <i className="bi bi-caret-right-fill"></i>
              </Button>
            </div>
            <div className="grid grid-cols-7 text-xs leading-6 text-center text font-medium text-white bg-default-300 rounded-small">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 text-sm text-center">
              {days.map((date) => (
                <div key={date.toString()} className="p-0.5">
                  <button
                    type="button"
                    className={classNames(
                      !isSameMonth(date, month) && "text-gray-300",
                      isToday(date) && " bg-default-300 text-primary-600",
                      !!value &&
                        isEqual(date, new Date(value)) &&
                        " text-white bg-primary-600",
                      !!value &&
                        !isEqual(date, new Date(value)) &&
                        !isToday(date) &&
                        "hover:bg-gray-100",
                      "aspect-square h-full rounded-full p-1.5"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDate(date.getTime());
                    }}
                  >
                    <time dateTime={format(date, "yyyy-MM-dd")}>
                      {format(date, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const getAllDayInMonth = (month: Date) => {
  const start = startOfWeek(startOfMonth(month));
  let end = endOfWeek(endOfMonth(month));

  if (!isEqual(sub(startOfDay(end), { days: 41 }), start))
    end = add(end, { weeks: 1 });

  return eachDayOfInterval({ start: start, end: end });
};
