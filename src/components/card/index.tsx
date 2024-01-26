import { JSXElement } from "solid-js";

interface ICARD {
  img?: string;
  title?: string;
  subTitle?: string;
  footer?: JSXElement;
  imgHueRotation?: number;
  imgBrighter?: boolean;
  className?: string;
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
      {props.img && (
        <figure>
          <img
            src={props.img}
            style={{
              filter: props.imgBrighter
                ? "brightness(3)"
                : `hue-rotate(${props.imgHueRotation}deg)`,
            }}
          />
        </figure>
      )}
      <div class="card-body">
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
