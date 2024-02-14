import { JSXElement } from "solid-js";

interface IModalContent {
  img?: JSXElement;
  text?: string;
}

const NpcTalk = (props: IModalContent) => {
  return (
    <div>
      <div>{props.text}</div>
    </div>
  );
};

export default NpcTalk;
