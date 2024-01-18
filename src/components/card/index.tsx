import { JSXElement } from "solid-js";

interface ICARD {
  img: string;
  title: string;
  footer?: JSXElement;
  imgHueRotation?: number;
  imgBrighter?: boolean;
}

const Card = ({ img, title, footer, imgHueRotation, imgBrighter }: ICARD) => {
  return (
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          style={{
            filter: imgBrighter
              ? "brightness(3)"
              : `hue-rotate(${imgHueRotation}deg)`,
          }}
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-[16px]">{title}</h2>
        {footer}
        {/* <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
