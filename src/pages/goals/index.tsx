import { useDisclosure } from "@nextui-org/react";
import GoalDetails from "./components/GoalDetails";
import GoalForm from "./c-pages/goal-form/GoalForm";
import GoalList from "./components/GoalList";
import { useAppSelector } from "../../store";
import { useEffect } from "react";
import ResizableCol from "../../shared/components/ResizableCol";

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
        <ResizableCol
          defaultWidth={252}
          minWidth={180}
          maxWidth={"40%"}
          side="left"
        >
          <GoalList openForm={onOpen} />
        </ResizableCol>
        <div className="grow">
          <GoalDetails onEdit={onOpenChange} />
        </div>
      </div>
      <GoalForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
