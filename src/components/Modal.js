const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <article
      className={`custom-modal ${isOpen && "is-open"}`}
      onClick={closeModal}
    >
      <div className="modal-container rounded">
        <button onClick={closeModal} className="modal-close">
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
