import React from "react";

export default function Logo({ width = 40 }: { width?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 81.4581 128"
      width={width}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="25.80873"
          y1="122.55245"
          x2="13.80874"
          y2="83.55241"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#a7a9ac" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-4.52666"
          y1="104.59146"
          x2="28.6332"
          y2="71.4316"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#231f20" />
          <stop offset="1" stopColor="#f1f2f2" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="-12.31151"
          y1="93.76967"
          x2="62.24464"
          y2="19.21352"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.24989" stopColor="#fcfcfc" />
          <stop offset="0.44523" stopColor="#f2f2f3" />
          <stop offset="0.62202" stopColor="#e1e2e3" />
          <stop offset="0.78789" stopColor="#cacbcd" />
          <stop offset="0.94483" stopColor="#acaeb1" />
          <stop offset="0.96848" stopColor="#a7a9ac" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-4"
          x1="16.5936"
          y1="64.86459"
          x2="64.65868"
          y2="16.79952"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <g contentStyleType="isolation:isolate">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              d="M0,128H0V74.9726H38.6537V89.3464A38.65361,38.65361,0,0,1,0,128Z"
              fill="url(#linear-gradient)"
            />
            <path
              d="M38.6537,86.5033V74.9726H0v36.5783S4.2607,87.4478,38.6537,86.5033Z"
              opacity="0.47"
              fill="url(#linear-gradient-2)"
              contentStyleType="mix-blend-mode:multiply"
            />
            <path
              d="M40.7291,0A40.72911,40.72911,0,0,0,0,40.7291V111.551S4.4102,81.4582,40.7291,81.4582A40.7291,40.7291,0,0,0,40.7291,0Z"
              fill="url(#linear-gradient-3)"
            />
            <path
              d="M40.7291,0A40.71837,40.71837,0,0,0,4.832,21.4789,39.02727,39.02727,0,0,1,59.9792,76.6263,40.73189,40.73189,0,0,0,40.7291,0Z"
              fill="url(#linear-gradient-4)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
