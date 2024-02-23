import { Button, Divider, ScrollShadow } from "@nextui-org/react";
import { addYears, eachYearOfInterval, setYear } from "date-fns";
import React, { useCallback } from "react";
import { PickType } from "../DatePicker";

interface YearPickerProps {
  monthInView: Date;
  setPickType: (type: PickType) => void;
  setMonthInView: React.Dispatch<React.SetStateAction<Date>>;
}

const yearList = eachYearOfInterval({
  start: new Date(1970, 1, 1),
  end: addYears(new Date(), 50),
}).map((year) => year.getFullYear());

export default function YearPicker({
  monthInView,
  setMonthInView,
  setPickType,
}: YearPickerProps) {
  const isCurrentMonth = (year: number) => year === monthInView?.getFullYear();
  const currentMonthRef = useCallback((current: HTMLButtonElement) => {
    setTimeout(() => current?.scrollIntoView({ block: "center" }), 50);
  }, []);

  return (
    <>
      <ScrollShadow className="none-scrollbar h-[272px] scroll-smooth">
        {yearList.map((year) => (
          <Button
            key={year}
            variant="light"
            autoFocus={true}
            fullWidth
            ref={isCurrentMonth(year) ? currentMonthRef : undefined}
            className={isCurrentMonth(year) ? "text-large font-bold" : "fw-400"}
            onClick={() => {
              setMonthInView((prev) => setYear(prev, year));
              setPickType("month");
            }}
          >
            {year}
          </Button>
        ))}
      </ScrollShadow>
      <Divider className="my-2 h-[0.5px]" />
      <Button
        color="danger"
        variant="light"
        fullWidth
        onClick={() => setPickType("month")}
        className="fw-400"
      >
        Back
      </Button>
    </>
  );
}
