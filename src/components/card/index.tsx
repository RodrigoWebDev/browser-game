interface ICARD {
  img: string;
  title: string;
  description: string;
  footer: any;
  imgHueRotation: number;
  imgBrighter: boolean;
}

const Card = ({
  img,
  title,
  description,
  footer,
  imgHueRotation,
  imgBrighter,
}: ICARD) => {
  return (
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
          style={{
            filter: imgBrighter
              ? "brightness(3)"
              : `hue-rotate(${imgHueRotation}deg)`,
          }}
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-[16px]">{title}</h2>
        <p class="text-[14px]">{description}</p>
        {footer}
        {/* <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
