import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setIsEdit } from "../../../store/modules/goals/goalSlice";
import DeleteModal from "../c-pages/delete-modal/DeleteModal";

interface IProps {
  onEdit: () => void;
}

export default function GoalDetails({ onEdit }: IProps) {
  const dispatch = useAppDispatch();
  const { selectedGoalId, goalList, updateSuccess } = useAppSelector(
    (state) => state.goals,
  );
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const selectedGoal = useMemo(() => {
    return goalList.find((goal) => goal.id === selectedGoalId);
  }, [selectedGoalId, goalList]);

  const handleOnEdit = () => {
    dispatch(setIsEdit(true));
    onEdit();
  };

  useEffect(() => {
    if (updateSuccess && isOpen) {
      onOpenChange();
    }
  }, [updateSuccess]);

  return (
    <>
      <div className="h-full">
        <div className="h-full w-1/2 border-r">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2 ">
              <div
                className={`bg-${selectedGoal?.iconThumb.color}-500 flex h-10 w-10 items-center justify-center rounded-md text-large text-background`}
              >
                <i className={`bi bi-${selectedGoal?.iconThumb.iconName}`}></i>
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="mb-1 text-large font-semibold leading-none">
                  {selectedGoal?.name}
                </h3>
                <span className={`text-xs leading-none text-default-400`}>
                  {"End date: " +
                    (selectedGoal?.endDate
                      ? format(selectedGoal?.endDate, "dd/MM/yyy")
                      : "not set")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-large text-default-500"
                onClick={handleOnEdit}
              >
                <i className="bi bi-pencil-square"></i>
              </Button>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-large text-default-500"
                onClick={onOpen}
              >
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </div>
          </div>
          <Divider />
          <div className="h-[calc(100%-3.5rem)]"></div>
        </div>
      </div>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
