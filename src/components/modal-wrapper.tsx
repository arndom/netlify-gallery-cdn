import { ReactNode } from "react";
import { Modal } from "@nextui-org/modal";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}
const ModalWrapper = (props: Props) => {
  const { isOpen, onOpenChange, children } = props;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
      size="full"
      scrollBehavior="outside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "linear",
            },
          },
          exit: {
            y: 200,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "linear",
            },
          },
        },
      }}
      classNames={{
        backdrop: "z-8",
        base: "z-8  mt-0",
        wrapper: "z-8 overflow-hidden",
        closeButton: "hidden",
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
