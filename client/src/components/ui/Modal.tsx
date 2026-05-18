interface ModalProps {

  isOpen: boolean;

  onClose: () => void;

  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  children
}: ModalProps) => {

  if (!isOpen) {
    return null;
  }

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-white
        rounded-lg
        p-6
        w-full
        max-w-lg
      "
      >

        <button
          onClick={onClose}
          className="
          float-right
          text-xl
        "
        >
          ×
        </button>

        {children}

      </div>

    </div>
  );
};

export default Modal;