import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { goalSchema } from "../../../shared/schema/goal.schema";
import { modalMotionProps } from "../../../shared/utils/style.utils";
import GoalIconSelector from "./GoalIconSelector";
import DatePicker from "../../../shared/components/date-picker/DatePicker";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function GoalForm({ isOpen, onOpenChange }: Props) {
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

  const onSubmitSuccess = (data: Object) => {
    console.log(data);
  };

  const onSubmitError = (errors: Object) => {
    console.error(errors);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                    className="h-8 flex items-center fw-400 justify-between px-2 mt-2 cursor-pointer"
                  >
                    Set end date
                    <i className="bi bi-calendar-week"></i>
                  </Button>
                  <DatePicker
                    value={endDate}
                    setDate={(date) => setValue("endDate", date)}
                  />
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
