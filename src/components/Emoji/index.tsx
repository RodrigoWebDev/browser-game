import { createEffect, onMount } from "solid-js";

const Emoji = ({ emoji }: { emoji: string }) => {
  let ref: any;

  createEffect(() => {
    console.log({ ref });
  });

  onMount(() => {
    console.log({ ref });
    ref.style.width = "0px";
  });

  return <div ref={ref}>{emoji}</div>;
};

export default Emoji;
