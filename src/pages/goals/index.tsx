import { useDisclosure } from "@nextui-org/react";
import GoalDetails from "./components/GoalDetails";
import GoalForm from "./c-pages/goal-form/GoalForm";
import GoalList from "./components/GoalList";
import { useAppSelector } from "../../store";
import { useEffect } from "react";

export default function GoalsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { updateSuccess } = useAppSelector((state) => state.goals);

  useEffect(() => {
    if (updateSuccess && isOpen) {
      onOpenChange();
    }
  }, [updateSuccess]);

  return (
    <>
      <div className="flex h-full">
        <div className="w-64 border-r-3 border-double">
          <GoalList openForm={onOpen} />
        </div>
        <div className="grow">
          <GoalDetails onEdit={onOpenChange} />
        </div>
      </div>
      <GoalForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
