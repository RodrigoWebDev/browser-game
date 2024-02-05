import { JSXElement, createSignal, onMount } from "solid-js";

interface ICARD {
  img?: string;
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
  const [imageSize, setImageSize] = createSignal(0);
  let cardContainerRef: any;

  onMount(() => {
    setImageSize(cardContainerRef.offsetWidth);
  });

  return (
    <div
      ref={cardContainerRef}
      class={`card bg-base-100 shadow-xl ${props.className}`}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      <div
        class="bg-[#15191e] rounded-t-xl text-center"
        style={{ "font-size": `${imageSize() / 1.5}px` }}
      >
        {props.img}
      </div>
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
