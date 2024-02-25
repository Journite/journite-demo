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
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "../../../../shared/components/date-picker/DatePicker";
import { Goal } from "../../../../shared/model/goal.model";
import { goalSchema } from "../../../../shared/schema/goal.schema";
import { modalMotionProps } from "../../../../shared/utils/style.utils";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  createGoal,
  setIsEdit,
  updateGoal,
} from "../../../../store/modules/goals/goalSlice";
import GoalIconSelector from "./icon-selector/IconSelector";
import { IModalProps } from "../type";

export default function GoalForm(props: IModalProps) {
  const dispatch = useAppDispatch();

  const { updating, selectedGoalId, isEdit, goalList } = useAppSelector(
    (state) => state.goals,
  );

  const defaultValues = {
    name: "",
    iconThumb: {
      color: "zinc",
      iconName: "person-arms-up",
    },
  } as Goal;

  const {
    setValue,
    watch,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(goalSchema),
    defaultValues: defaultValues,
    resetOptions: { keepDefaultValues: true },
  });

  useEffect(() => {
    if (props.isOpen) {
      if (isEdit) {
        const selectedGoal = goalList.find(
          (goal) => goal.id === selectedGoalId,
        );
        reset(selectedGoal);
      } else reset(defaultValues);
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (!props.isOpen && isEdit) dispatch(setIsEdit(false));
  }, [props.isOpen]);

  const { iconThumb, endDate, name } = watch();
  const { isOpen, onOpenChange } = useDisclosure({ id: "datePicker" });

  const onSubmitSuccess = (data: Goal) => {
    if (isEdit) dispatch(updateGoal(data));
    else dispatch(createGoal(data));
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
          <form onSubmit={handleSubmit(onSubmitSuccess)}>
            <ModalHeader>
              {!isEdit ? "Create new goal" : "Edit goal"}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <GoalIconSelector
                  selectedColor={iconThumb.color}
                  selectedIcon={iconThumb.iconName}
                  setValue={setValue}
                />
                <div className="grow">
                  <Input
                    variant="faded"
                    color={!!errors.name ? "danger" : "default"}
                    size="sm"
                    radius="md"
                    label="Your goal"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    value={name}
                    {...register("name")}
                  />
                </div>
              </div>
              <Button
                fullWidth
                variant="faded"
                className="fw-400 flex h-9 cursor-pointer items-center justify-between border-default-200 bg-default-100 px-3 text-default-600 data-[hover=true]:border-default-400 data-[hover=true]:bg-default-100 data-[hover=true]:opacity-100"
                onClick={onSetEndDate}
              >
                Set end date
                <div className="flex gap-2 font-normal">
                  <span className="text-primary">
                    {endDate && format(endDate, "dd/MM/yyyy")}
                  </span>
                  <i className="bi bi-calendar-week "></i>
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
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                isLoading={updating}
                type="submit"
                size="sm"
                color="primary"
                className="text-sm"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
