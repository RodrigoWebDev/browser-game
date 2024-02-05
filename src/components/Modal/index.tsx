import { createEffect, createSignal, JSXElement } from "solid-js";

interface IModal {
  isOpen?: boolean;
  title?: string;
  hideCloseButton?: boolean;
  children?: JSXElement;
}

const Modal = (props: IModal) => {
  const [_isOpen, _setIsOpen] = createSignal(props.isOpen);

  createEffect(() => {
    _setIsOpen(props.isOpen);
  });

  return (
    <dialog
      id="my_modal_1"
      class={`modal ${_isOpen() ? "opacity-100 pointer-events-auto" : ""}`}
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
        {!props.hideCloseButton && (
          <div class="modal-action">
            <form method="dialog">
              <button
                class="btn"
                onClick={() => {
                  _setIsOpen(false);
                }}
              >
                Fechar
              </button>
            </form>
          </div>
        )}
        {/* <div class="modal-action">
          <form method="dialog">
            <button
              class="btn"
              onClick={() => {
                _setIsOpen(false);
              }}
            >
              Close
            </button>
          </form>
        </div> */}
      </div>
    </dialog>
  );
};

export default Modal;
