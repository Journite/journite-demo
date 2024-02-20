import React from "react";

export default function IconBox({color, variant}) {
  return (
    <div
      className={`w-9 h-9 rounded-md text-lg flex justify-center items-center ${
        renderColors().iconStyle
      }`}
    >
      <i className={`bi bi-${iconName}`}></i>
    </div>
  );
}
