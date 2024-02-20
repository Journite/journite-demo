export const modalMotionProps = {
  animate: {
    opacity: 1,
    transform:
      "translateY(var(--slide-enter)) scale(var(--scale-enter)) translateZ(1)",
  },
  initial: {
    opacity: 0,
    transform:
      "translateY(var(--slide-exit)) scale(var(--scale-exit)) translateZ(0)",
  },
  exit: {
    opacity: 0,
    transform:
      "translateY(var(--slide-exit)) scale(var(--scale-exit)) translateZ(0)",
  },
};

