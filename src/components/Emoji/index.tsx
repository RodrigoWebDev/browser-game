import { createEffect, createSignal } from "solid-js";

const Emoji = ({ emoji }: { emoji: string }) => {
  const [width, setWidth] = createSignal(0);
  let ref: any;

  createEffect(() => {
    console.log(ref.clientWidth);

    setWidth(ref.clientWidth / 2);
  });

  /* onMount(() => {
    console.log({ ref });
    ref.style.width = "0px";

    console.log("Teste");
  }); */

  return (
    <div
      style={{
        "font-size": `${width()}px`,
      }}
      class="flex items-center justify-center"
      ref={ref}
    >
      {emoji}
    </div>
  );
};

export default Emoji;
