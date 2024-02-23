import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../../store";
import Logo from "../Logo";
import { useEffect, useState } from "react";

export default function LoadingOverlay() {
  const goalLoading = useAppSelector((state) => state.goals.loading);
  const goalUpdating = useAppSelector((state) => state.goals.updating);

  const isShow = goalLoading || goalUpdating;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isShow) setShow(true);
    else setTimeout(() => setShow(false), 1000);
  }, [isShow]);

  return (
    <>
      <div className={show ? "" : "hidden"}>
        <AnimatePresence>
          {isShow && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 top-0 z-[1000000000] flex items-center justify-center bg-black/20 backdrop-blur-[0.5px]"
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                  velocity: 0.2,
                }}
                className="flex h-32 w-32 flex-col items-center justify-center gap-4 rounded-lg border-[1.5px] bg-black text-lg text-content1-foreground"
              >
                <motion.div
                  initial={{ rotate: 360, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -360, scale: 0.8 }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1,
                    duration: 1,
                    type: "spring",
                    velocity: 0.2,
                  }}
                  className="mt-4"
                >
                  <Logo width={32} />
                </motion.div>
                <span className="text-medium text-white">Loading...</span>
              </motion.div>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
