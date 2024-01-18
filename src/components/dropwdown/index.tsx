import { JSXElement } from "solid-js";

interface IDropDown {
  items: JSXElement;
  buttonChildren: JSXElement;
}

const DropDown = (props: IDropDown) => {
  return (
    <details data-id="dropdown" class="dropdown mr-2">
      {/* @ts-ignore */}
      <summary class="m-1 btn">
        {/* <SwordsSvg className="w-[16px] text-white" /> */}
        {props.buttonChildren}
      </summary>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {props.items}
        {/* {items.map((item) => {
          return (
            <li
              onClick={() => {
                item.click(index);
              }}
            >
              <a data-id="action">{item.name}</a>
            </li>
          );
        })} */}
      </ul>
    </details>
  );
};

export default DropDown;
