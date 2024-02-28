import { useState } from "react";

interface Props {
  name: string;
  color: string;
  iconName: string;
  isSelected?: boolean;
  onSelect: () => void;
}

interface Style {
  wrapperStyle: string;
  iconStyle: string;
  textStyle: string;
  subTextStyle: string;
}

export default function GoalItem({
  name,
  color,
  iconName,
  isSelected = false,
  onSelect,
}: Props) {
  const [hover, setHover] = useState(false);

  const renderColors = (): Style => {
    if (isSelected) {
      return {
        wrapperStyle: `bg-${color}-500`,
        iconStyle: `text-${color}-500 bg-background`,
        textStyle: "text-background",
        subTextStyle: "text-background",
      };
    } else
      return {
        wrapperStyle: `hover:bg-${color}-400/10`,
        iconStyle: `text-white bg-${color}-500`,
        textStyle: `text-${color}-500`,
        subTextStyle: "text-default-400",
      };
  };

  return (
    <div
      draggable
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
      className={`mt-1.5 flex cursor-pointer items-center rounded-e-medium p-1 pl-0 transition-colors duration-400 transition-background first:mt-0 ${
        renderColors().wrapperStyle
      }`}
    >
      <i
        className={`bi bi-grip-vertical cursor-move text-xl ${hover ? renderColors().textStyle : "text-transparent"}`}
      ></i>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-small ${
          renderColors().iconStyle
        }`}
      >
        <i className={`bi bi-${iconName}`}></i>
      </div>
      <div className="ml-2 w-[calc(100%-4rem)]">
        <div className={`truncate text-sm ${renderColors().textStyle}`}>
          {name}
        </div>
        <div className={`text-xs ${renderColors().subTextStyle}`}>0 done</div>
      </div>
    </div>
  );
}
