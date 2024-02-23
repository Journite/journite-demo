import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMemo } from "react";
import { modalMotionProps } from "../../../../shared/utils/style.utils";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { IModalProps } from "../type";
import { deleteGoal } from "../../../../store/modules/goals/goalSlice";

export default function DeleteModal(props: IModalProps) {
  const dispatch = useAppDispatch();

  const { selectedGoalId, goalList, updating } = useAppSelector(
    (state) => state.goals,
  );

  const selectedGoal = useMemo(() => {
    return goalList.find((goal) => goal.id === selectedGoalId);
  }, [selectedGoalId, goalList]);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        motionProps={modalMotionProps}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{"Confirm delete"}</ModalHeader>
              <ModalBody>
                <div className="">
                  Delete{" "}
                  <span
                    className={`font-medium text-${selectedGoal?.iconThumb.color}-500`}
                  >
                    {`"${selectedGoal?.name}"`}
                  </span>
                  ?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  size="sm"
                  variant="flat"
                  className="fw-400 text-sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={updating}
                  type="submit"
                  size="sm"
                  color="primary"
                  className="text-sm"
                  onClick={() => dispatch(deleteGoal(selectedGoal?.id ?? ""))}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
