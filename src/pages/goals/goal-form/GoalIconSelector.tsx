import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { MouseEvent } from "react";
import {
  Color,
  colorList,
  iconList,
} from "../../../shared/utils/constant.utils";
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
    <Popover
      placement="right-start"
      offset={10}
      className="rounded-medium"
      backdrop="opaque"
      classNames={{backdrop: "bg-transparent"}}
    >
      <PopoverTrigger className=" aria-expanded:translate-y-1.5 aria-expanded:scale-125 aria-expanded:opacity-100">
        <div
          className={`bg-${color}-500 flex h-12 w-12 cursor-pointer items-center justify-center rounded-medium text-2xl text-background transition-all duration-75`}
        >
          <i className={`bi bi-${iconName}`}></i>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-[21.625rem] px-1 py-2">
          <div>
            <div className="mb-2 text-small font-bold">Icon</div>
            <div className="flex flex-wrap gap-4 text-default-500 ">
              {iconList.map((iconName) => (
                <div
                  key={iconName}
                  className="cursor-pointer text-3xl transition-colors hover:text-default-900"
                  onClick={(e) => onSelectIcon(e, iconName)}
                >
                  <i className={`bi bi-${iconName}`}></i>
                </div>
              ))}
            </div>
          </div>
          <Divider className="my-2" />
          <div>
            <div className="mb-2 text-small font-bold">Color</div>
            <div className="flex flex-wrap gap-2">
              {colorList.map((color) => (
                <div
                  key={color}
                  className={`bg-${color}-500 h-6 w-6 cursor-pointer rounded-full hover:shadow-medium`}
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
