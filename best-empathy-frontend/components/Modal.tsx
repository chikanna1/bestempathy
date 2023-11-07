import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e: { target: { id: string } }) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-auto h-auto flex flex-col  overflow-y-auto overflow-x-hidden min-h-[200px] min-w-[200px]">
        <div className="bg-white rounded">
          <div className="flex justify-end" onClick={() => onClose()}>
            <FontAwesomeIcon
              className="w-[20px] text-blue-gray-700 px-3 py-3 cursor-pointer"
              icon={faXmark}
              size="2x"
            />
          </div>
          <div className="px-[20px] py-[20px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
