/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import GameView from "./GameView";

const root = document.getElementById("root");

render(() => <GameView />, root!);
