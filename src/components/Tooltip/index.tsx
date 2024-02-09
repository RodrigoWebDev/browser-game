import { JSXElement } from "solid-js";

interface IToolTip {
  children: JSXElement;
  text: string;
  className?: string;
}

const ToolTip = (props: IToolTip) => {
  return (
    <div
      class={`${props.text && "tooltip"} ${props.className}`}
      data-tip={props.text}
    >
      {props.children}
    </div>
  );
};

export default ToolTip;
