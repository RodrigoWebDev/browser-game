import { JSXElement } from "solid-js";

interface IToolTip {
  children: JSXElement;
  text?: string;
  className?: string;
  direction?: "right" | "left" | "bottom" | "top";
}

const ToolTip = (props: IToolTip) => {
  return (
    <div
      class={`${props.text && "tooltip"} tooltip-${props.direction} ${
        props.className
      }`}
      data-tip={props.text}
    >
      {props.children}
    </div>
  );
};

export default ToolTip;
