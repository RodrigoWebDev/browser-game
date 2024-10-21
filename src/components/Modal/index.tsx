import { createEffect, createSignal, JSXElement, onMount } from "solid-js";
import Button from "../Button";
import { modalState } from "../../state/modal";

interface IModal {
  isOpen?: boolean;
  title?: string;
  hideCloseButton?: boolean;
  children?: JSXElement;
}

const Modal = (props: IModal) => {
  const [_isOpen, _setIsOpen] = createSignal(props.isOpen);
  const [modal, setModal] = modalState;

  onMount(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setModal({
          isOpen: false,
        });
      }
    });
  });

  createEffect(() => {
    _setIsOpen(props.isOpen);
  });

  return (
    <dialog
      class={`modal bg-black/50 ${
        /* _isOpen() */ modal().isOpen ? "opacity-100 pointer-events-auto" : ""
      }`}
    >
      {_isOpen() && (
        <div class="modal-box">
          <h3 class="font-bold text-lg">{props.title}</h3>
          <div class="w-full">{props.children}</div>
          {!modal().hideCloseButton && (
            <div class="modal-action">
              <form method="dialog">
                <Button
                  onClick={() => {
                    _setIsOpen(false);
                  }}
                >
                  Fechar
                </Button>
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
      )}
    </dialog>
  );
};

export default Modal;
