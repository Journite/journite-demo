import { Resizable } from "re-resizable";
import React, { ReactNode, useState } from "react";

interface IProps {
  side: "left" | "right";
  defaultWidth: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  children?: ReactNode;
}

export default function ResizableCol({
  side,
  defaultWidth,
  minWidth,
  maxWidth,
  children,
}: IProps) {
  const [resizing, setResizing] = useState(false);

  return (
    <>
      {side === "right" && (
        <div className="-mr-1.5 border border-l-3 border-double"></div>
      )}
      <Resizable
        className={`overflow-hidden ${resizing ? "shadow-lg" : ""} p${side === "left" ? "r" : "l"}-1.5`}
        defaultSize={{ width: defaultWidth, height: "100%" }}
        enable={{
          top: false,
          bottom: false,
          right: side === "left",
          topRight: side === "left",
          bottomRight: side === "left",
          left: side === "right",
          bottomLeft: side === "right",
          topLeft: side === "right",
        }}
        onResizeStart={() => setResizing(true)}
        onResizeStop={() => setResizing(false)}
        minWidth={minWidth}
        maxWidth={maxWidth}
        handleStyles={{
          [side === "left" ? "topRight" : "topLeft"]: {
            cursor: "w-resize",
            width: "14px",
          },
          [side === "left" ? "bottomRight" : "bottomLeft"]: {
            cursor: "w-resize",
            width: "14px",
          },
          [side === "left" ? "right" : "left"]: {
            cursor: "w-resize",
            width: "14px",
            zIndex: "10",
            background: resizing
              ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 70%)"
              : "",
          },
        }}
      >
        {children}
      </Resizable>
      {side === "left" && (
        <div className="-ml-1.5 border border-l-3 border-double"></div>
      )}
    </>
  );
}
