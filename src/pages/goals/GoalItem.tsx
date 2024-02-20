interface Props {
  name: string;
  color: string;
  iconName: string;
  isSelected?: boolean;
}

interface Style {
  wrapperStyle: string;
  iconStyle: string;
  textStyle: string;
}

export default function GoalItem({
  name,
  color,
  iconName,
  isSelected = false,
}: Props) {
  const renderColors = (): Style => {
    if (isSelected) {
      return {
        wrapperStyle: `bg-${color}-500`,
        iconStyle: `text-${color}-500 bg-background`,
        textStyle: "text-background font-semibold",
      };
    } else
      return {
        wrapperStyle: `hover:bg-${color}-300/20`,
        iconStyle: `text-white bg-${color}-500`,
        textStyle: `text-${color}-500`,
      };
  };

  return (
    <div
      className={`flex items-center gap-2 h-10 rounded-medium p-1 cursor-pointer mt-1 first:mt-0 ${
        renderColors().wrapperStyle
      }`}
    >
      <div
        className={`w-8 h-8 rounded-md flex justify-center items-center ${
          renderColors().iconStyle
        }`}
      >
        <i className={`bi bi-${iconName}`}></i>
      </div>
      <span
        className={`w-[calc(100%-3rem)] text-small leading-none truncate ${
          renderColors().textStyle
        }`}
      >
        {name}
      </span>
    </div>
  );
}
