import { createEffect, createSignal } from "solid-js";

interface IEmojiDisplay {
  code: string;
}

const EmojiDisplay = (props: IEmojiDisplay) => {
  const [imageSize, setImageSize] = createSignal(32);
  const [myRef, setMyRef] = createSignal<any>(null);

  createEffect(() => {
    if (myRef() && myRef().offsetWidth > 0) {
      setImageSize(myRef().offsetWidth);
    }
  });

  return (
    <div
      class="text-center w-full"
      ref={setMyRef}
      style={{ "font-size": `${imageSize() / 1.5}px` }}
    >
      {props.code}
    </div>
  );
};

export default EmojiDisplay;
