interface IModal {
  isOpen?: boolean;
  children: any;
  title: string;
  hideCloseButton?: boolean;
}

const Modal = (props: IModal) => {
  /* const [_isOpen, _setIsOpen] = createSignal(isOpen);

  createEffect(() => {
    console.log({ isOpen });
    _setIsOpen(isOpen);
  });
 */
  return (
    <dialog
      id="my_modal_1"
      class={`modal ${
        /* _isOpen() */ props.isOpen ? "opacity-100 pointer-events-auto" : ""
      }`}
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
        {props.hideCloseButton && (
          <div class="modal-action">
            <form method="dialog">
              <button
                class="btn"
                /* onClick={() => {
                  _setIsOpen(false);
                }} */
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
