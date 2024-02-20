import { useDisclosure } from "@nextui-org/react";
import GoalDetails from "./GoalDetails";
import GoalForm from "./goal-form";
import GoalList from "./GoalList";

export default function GoalsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });

  return (
    <>
      <div className="flex h-full">
        <div className="w-56 border-r-3 border-double">
          <GoalList openForm={onOpen} />
        </div>
        <div className="grow">
          <GoalDetails
            {...{
              iconName: "moon-stars-fill",
              name: "Be healthier",
              color: "red",
              endDate: new Date(2024, 2, 18),
            }}
          />
        </div>
      </div>
      <GoalForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
