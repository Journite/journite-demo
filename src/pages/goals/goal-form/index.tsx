import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { goalSchema } from "../../../shared/schema/goal.schema";
import { modalMotionProps } from "../../../shared/utils/style.utils";
import GoalIconSelector from "./GoalIconSelector";
import DatePicker from "../../../shared/components/date-picker/DatePicker";
import { useState } from "react";
import { format } from "date-fns";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function GoalForm(props: Props) {
  const {
    setValue,
    watch,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(goalSchema),
    defaultValues: {
      iconThumb: {
        color: "green",
        iconName: "person-arms-up",
      },
    },
  });

  const [iconThumb, endDate] = watch(["iconThumb", "endDate"]);
  const { isOpen, onOpenChange, onClose } = useDisclosure({ id: "datePicker" });

  const onSubmitSuccess = (data: Object) => {
    console.log(data);
  };

  const onSubmitError = (errors: Object) => {
    console.error(errors);
  };

  const onSetEndDate = () => {
    if (!endDate) setValue("endDate", new Date().getTime());
    onOpenChange();
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        motionProps={modalMotionProps}
        className="!z-30"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create new goal</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
                  <div className="flex gap-2">
                    <GoalIconSelector {...iconThumb} setValue={setValue} />
                    <div className="grow">
                      <Input
                        size="sm"
                        radius="md"
                        label="Your goal"
                        {...register("name")}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    </div>
                  </div>
                  <Button
                    fullWidth
                    variant="light"
                    className="fw-400 mt-2 flex h-8 cursor-pointer items-center justify-between px-2 font-medium"
                    onClick={onSetEndDate}
                  >
                      Set end date
                    <div className="flex gap-1 font-normal">
                      {endDate && format(endDate, "dd/MM/yyyy")}
                      <i className="bi bi-calendar-week"></i>
                    </div>
                  </Button>
                  {endDate && (
                    <DatePicker
                      isOpen={isOpen}
                      onClose={onOpenChange}
                      value={endDate}
                      setValue={(date) => setValue("endDate", date)}
                    />
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  variant="ghost"
                  color="danger"
                  onClick={onClose}
                  className="fw-400 border"
                >
                  Close
                </Button>
                <Button size="sm" color="primary">
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
