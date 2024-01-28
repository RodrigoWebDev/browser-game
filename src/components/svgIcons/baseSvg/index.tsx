import { ISVG } from "../../../interfaces";
import { JSXElement } from "solid-js";

interface IBaseSvg extends ISVG {
  children: JSXElement;
}

const BaseSvg = (props: IBaseSvg) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
      /* fill={props.fill || "#a6adbb"} */
      class={`${props.className} fill-neutral-content`}
    >
      {props.children}
    </svg>
  );
};

export default BaseSvg;
