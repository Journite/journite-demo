import { Divider } from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";
import DatePicker from "../../shared/components/date-picker/DatePicker";

interface Goal {
  name: string;
  color: string;
  iconName: string;
  endDate?: Date;
}

export default function GoalDetails({ color, name, iconName, endDate }: Goal) {
  return (
    <div className="h-full">
      <div className="">
        <div className="flex gap-2 items-center p-2">
          <div
            className={`bg-${color}-500 text-background w-10 h-10 text-large rounded-md flex justify-center items-center`}
          >
            <i className={`bi bi-${iconName}`}></i>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="leading-none text-large font-semibold mb-1">
              {name}
            </h3>
            {endDate && (
              <span className={`text-default-400 text-xs leading-none`}>
                {"End date: " + format(endDate, "dd/MM/yyy")}
              </span>
            )}
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
