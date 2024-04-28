import { JSXElement } from "solid-js";

interface IDropDown {
  items: JSXElement;
  trigger: string;
}

const DropDown = (props: IDropDown) => {
  return (
    <>
      <div class="dropdown block">
        <div role="button">{props.trigger}</div>
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {props.items}
        </ul>
      </div>

      {/* <details data-id="dropdown" class="dropdown mr-2">
      <summary class="m-1 btn">{props.buttonChildren}</summary>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {props.items}
      </ul>
    </details> */}
    </>
  );
};

export default DropDown;
