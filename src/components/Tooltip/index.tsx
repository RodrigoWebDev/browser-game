import { JSXElement } from "solid-js";

interface IToolTip {
  children: JSXElement;
  text?: string;
  className?: string;
  direction?: "right" | "left" | "bottom" | "top";
  onClick?: () => void
}

const ToolTip = (props: IToolTip) => {
  return (
    <div
      class={`${props.text && "tooltip"} tooltip-${props.direction} ${
        props.className
      }`}
      data-tip={props.text}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
      {props.children}
    </div>
  );
};

export default ToolTip;
