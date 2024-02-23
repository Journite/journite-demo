import { Button, Divider } from "@nextui-org/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  getListOfGoals,
  setIsEdit,
  setSelectedGoal,
} from "../../../store/modules/goals/goalSlice";
import GoalItem from "./GoalItem";

export default function GoalList({ openForm }: { openForm: () => void }) {
  const dispatch = useAppDispatch();

  const { goalList, updateSuccess, selectedGoalId } = useAppSelector(
    (state) => state.goals,
  );

  useEffect(() => {
    dispatch(getListOfGoals());
  }, []);

  useEffect(() => {
    if (updateSuccess) dispatch(getListOfGoals());
  }, [updateSuccess]);

  useEffect(() => {
    if (goalList.length === 0) dispatch(setSelectedGoal(undefined));
  }, [goalList]);

  const handleAddNew = () => {
    dispatch(setIsEdit(false));
    openForm();
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-3 pl-4 font-semibold">
        <h4>Goals</h4>
        <Button
          isIconOnly
          radius="full"
          color="primary"
          size="sm"
          className="text-lg"
          onClick={handleAddNew}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
      </div>
      <Divider className="mb-0" />
      <div className="h-[calc(100%-3.625rem)] overflow-y-scroll py-3">
        {goalList.map((goal) => (
          <GoalItem
            key={goal.id}
            isSelected={!!goal.id && goal.id === selectedGoalId}
            iconName={goal.iconThumb.iconName}
            name={goal.name}
            color={goal.iconThumb.color}
            onSelect={() => dispatch(setSelectedGoal(goal.id))}
          />
        ))}
      </div>
    </div>
  );
}
