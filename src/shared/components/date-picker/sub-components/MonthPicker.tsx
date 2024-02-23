import {
  eachMonthOfInterval,
  endOfYear,
  format,
  getMonth,
  startOfYear,
} from "date-fns";
import { PickType } from "../DatePicker";
import { Button, Divider } from "@nextui-org/react";

interface MonthPickerProps {
  monthInView: Date;
  setPickType: (type: PickType) => void;
  setMonthInView: React.Dispatch<React.SetStateAction<Date>>;
}

export default function MonthPicker({
  monthInView,
  setPickType,
  setMonthInView,
}: MonthPickerProps) {
  const monthList = eachMonthOfInterval({
    start: startOfYear(monthInView),
    end: endOfYear(monthInView),
  });

  return (
    <>
      <div className="flex h-[328px] flex-col">
        <Divider className="my-2 h-[0.5px]" />
        <Button
          size="sm"
          variant="light"
          color="primary"
          fullWidth
          className="text-medium font-semibold"
          onClick={() => setPickType("year")}
          startContent={<i className="bi bi-calendar-week"></i>}
        >
          {format(monthInView, "yyyy")}
        </Button>
        <Divider className="my-2 h-[0.5px]" />
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
          {monthList.map((month) => {
            const isSelected = getMonth(monthInView) === getMonth(month);
            return (
              <Button
                key={month.getTime()}
                variant={isSelected ? "solid" : "light"}
                className={isSelected ? "" : "fw-400"}
                onClick={() => {
                  setMonthInView(month);
                  setPickType("day");
                }}
              >
                {format(month, "MMMM")}
              </Button>
            );
          })}
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
      </div>
    </>
  );
}
