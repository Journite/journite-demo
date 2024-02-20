import React from "react";
import GoalItem from "./GoalItem";
import { Button, Divider } from "@nextui-org/react";

export default function GoalList({ openForm }: { openForm: () => void }) {
  return (
    <div className="h-full">
      <div className="flex p-3 font-semibold items-center justify-between">
        <h4>Goals</h4>
        <Button
          isIconOnly
          radius="full"
          color="primary"
          size="sm"
          className="text-lg"
          onClick={openForm}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
      </div>
      <Divider className="mb-0" />
      <div className="overflow-y-scroll h-[calc(100%-3.625rem)] p-2 pr-0">
        <GoalItem
          isSelected
          iconName="moon-stars-fill"
          name="Be healthier"
          color="red"
        />
        <GoalItem
          iconName="moon-stars-fill"
          name="Be healthier"
          color="fuchsia"
        />
      </div>
    </div>
  );
}
