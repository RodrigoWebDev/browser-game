import { JSXElement, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

interface ICARD {
  img?: JSXElement;
  title?: string;
  subTitle?: string;
  footer?: JSXElement;
  imgHueRotation?: number;
  imgBrighter?: boolean;
  className?: string;
  cardBodyClassName?: string;
  onClick?: () => void;
}

const Card = (props: ICARD) => {
  return (
    <div
      class={`card bg-base-100 shadow-xl ${props.className}`}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      {props.img}
      <div class={`card-body ${props.cardBodyClassName}`}>
        {props.title && <h2 class="card-title text-[16px]">{props.title}</h2>}
        {props.subTitle && (
          <div class="text-[14px]">
            <span class="font-semibold">Type</span>:{" "}
            <span class="capitalize">{props.subTitle}</span>
          </div>
        )}
        {props.footer}
        {/* <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
