import { JSXElement } from "solid-js";

interface IDropDown {
  items: JSXElement;
  trigger: JSXElement;
}

const DropDown = (props: IDropDown) => {
  return (
    <>
      <div class="dropdown block">
        <div tabindex="0" role="button">
          {props.trigger}
          {/* <div class="avatar">
            <div class="rounded-xl">
              <img src={item.img} />
            </div>
          </div> */}
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
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
