import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { format, getMonth, isSameMonth } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { modalMotionProps } from "../../utils/style.utils";
import DayPicker from "./sub-components/DayPicker";
import MonthPicker from "./sub-components/MonthPicker";
import YearPicker from "./sub-components/YearPicker";

export type PickType = "day" | "month" | "year";

export default function DatePicker({
  isOpen,
  value,
  setValue,
  onClose,
}: {
  isOpen: boolean;
  value: number;
  setValue: (nextDate: number | undefined) => void;
  onClose: () => void;
}) {
  const [pickType, setPickType] = useState<PickType>("day");
  const [monthInView, setMonthInView] = useState<Date>(new Date());

  const renderPicker = () => {
    switch (pickType) {
      case "day":
        return (
          <DayPicker
            value={value}
            monthInView={monthInView}
            setValue={setValue}
            setMonthInView={setMonthInView}
            setPickType={setPickType}
          />
        );
      case "month":
        return (
          <MonthPicker
            monthInView={monthInView}
            setMonthInView={setMonthInView}
            setPickType={setPickType}
          />
        );
      case "year":
        return (
          <YearPicker
            monthInView={monthInView}
            setMonthInView={setMonthInView}
            setPickType={setPickType}
          />
        );
    }
  };

  useEffect(() => {
    if (isOpen) setMonthInView(new Date(value));
  }, [isOpen]);

  useEffect(() => {
    if (value && !isSameMonth(value, monthInView)) {
      setMonthInView(new Date(value));
    }
  }, [value]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        motionProps={modalMotionProps}
        classNames={{
          wrapper: "z-[1000]",
          base: "w-[328px] h-[400px]",
          backdrop: "z-[999]",
        }}
        hideCloseButton
        onClose={onClose}
      >
        <ModalContent>
          <ModalBody className="gap-0 bg-background px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <Button
                variant="light"
                disableAnimation
                className="fw-400 h-fit min-w-0 px-2 text-primary/70 hover:!bg-transparent hover:text-primary hover:underline"
                onClick={() => {
                  setValue(undefined);
                  onClose();
                }}
              >
                Unset
              </Button>
              <Input
                value={value ? format(value, "dd/MM/yyyy") : ""}
                classNames={{
                  label: "w-0",
                  mainWrapper: "grow",
                  base: "grow w-32",
                  inputWrapper:
                    "data-[hover=true]:bg-default-100 !cursor-default",
                  input: "!cursor-default text-center mr-6",
                }}
                labelPlacement="outside-left"
                readOnly
                size="sm"
                startContent={
                  <i className="bi bi-calendar-week text-default-500"></i>
                }
              />
              <Button
                size="sm"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Submit
              </Button>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.25 }}
              key={pickType}
            >
              {renderPicker()}
            </motion.div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
