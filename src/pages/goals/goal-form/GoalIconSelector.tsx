import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { MouseEvent } from "react";
import { Color, colorList, iconList } from "../../../shared/utils/constant.utils";
import { UseFormSetValue } from "react-hook-form";
import { Goal } from "../../../shared/model/goal.model";

interface GoalIconSelectorProps {
  color: string;
  iconName: string;
  setValue: UseFormSetValue<Goal>;
}

export default function GoalIconSelector({
  color,
  iconName,
  setValue,
}: GoalIconSelectorProps) {
  const onSelectColor = (e: MouseEvent<HTMLDivElement>, color: Color) => {
    e.stopPropagation();
    setValue("iconThumb.color", color);
  };

  const onSelectIcon = (e: MouseEvent<HTMLDivElement>, iconName: string) => {
    e.stopPropagation();
    setValue("iconThumb.iconName", iconName);
  };

  return (
    <Popover placement="right-start" offset={10} className="rounded-medium">
      <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-125 aria-expanded:translate-y-1.5 z-50">
        <div
          className={`bg-${color}-500 cursor-pointer duration-75 transition-all text-background w-12 h-12 text-2xl rounded-medium flex justify-center items-center`}
        >
          <i className={`bi bi-${iconName}`}></i>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 w-[21.625rem]">
          <div>
            <div className="text-small font-bold mb-2">Icon</div>
            <div className="flex flex-wrap gap-4 text-default-500 ">
              {iconList.map((iconName) => (
                <div
                  key={iconName}
                  className="text-3xl cursor-pointer hover:text-default-900 transition-colors"
                  onClick={(e) => onSelectIcon(e, iconName)}
                >
                  <i className={`bi bi-${iconName}`}></i>
                </div>
              ))}
            </div>
          </div>
          <Divider className="my-2" />
          <div>
            <div className="text-small font-bold mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {colorList.map((color) => (
                <div
                  key={color}
                  className={`bg-${color}-500 w-6 h-6 rounded-full cursor-pointer hover:shadow-medium`}
                  onClick={(e) => onSelectColor(e, color as Color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
