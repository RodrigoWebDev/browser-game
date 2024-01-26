import { JSXElement } from "solid-js";

interface IPlayer {
  children: JSXElement;
}

const Player = (props: IPlayer) => {
  return props.children;
};

export default Player;
