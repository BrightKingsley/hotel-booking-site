import { createContext, useState } from "react";

type TriggerModal = {
  message?: string;
  confirm?: Function;
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
};

type ModalContextType = {
  showModal: boolean;
  triggerModal: ({
    message,
    confirm,
    cancel,
    clickToDisable,
  }: TriggerModal) => void;
  modalMessage: string;
  actionConfirm: Function;
  actionCancel: Function;
  disableOnClick: boolean;
};

const ModalContext = createContext<ModalContextType>({
  showModal: !null,
  triggerModal: () => {},
  modalMessage: "",
  actionConfirm: () => {},
  actionCancel: () => {},
  disableOnClick: false,
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [actionConfirm, setActionConfirm] = useState<Function>(() => {});
  const [actionCancel, setActionCancel] = useState<Function>(() => {});
  const [modalMessage, setModalMessage] = useState<string>("");
  const [disableOnClick, setDisableOnClick] = useState<boolean>(false);

  const triggerModal = (
    { message, confirm, cancel, clickToDisable, show }: TriggerModal = {
      message: "",
      confirm: () => {},
      cancel: () => {},
      clickToDisable: false,
      show: false,
    }
  ) => {
    console.log(showModal, "before");
    console.log("TRIGGERING");
    show !== undefined
      ? setShowModal(show)
      : showModal
      ? setShowModal(false)
      : setShowModal(true);
    // showModal = showModal ? false : true;
    message && setModalMessage(message);
    confirm && typeof confirm === "function" && setActionConfirm(confirm);
    cancel && typeof cancel === "function" && setActionCancel(cancel);
    typeof clickToDisable === "boolean" && setDisableOnClick(clickToDisable);
    console.log(showModal, "after");
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        triggerModal,
        modalMessage,
        actionConfirm,
        actionCancel,
        disableOnClick,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
