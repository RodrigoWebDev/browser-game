import { JSXElement } from "solid-js";

interface ICARD {
  img: string;
  title: string;
  subTitle: string;
  footer?: JSXElement;
  imgHueRotation?: number;
  imgBrighter?: boolean;
}

const Card = (props: ICARD) => {
  return (
    <div class="card bg-base-100 shadow-xl">
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
      <div class="card-body">
        <h2 class="card-title text-[16px]">{props.title}</h2>
        <h3 class="card-title text-[14px]">Type: {props.subTitle}</h3>
        {props.footer}
        {/* <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
