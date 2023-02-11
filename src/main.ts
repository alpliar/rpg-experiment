import "./style.css";
import { setupCounter } from "./counter";
import { Overworld } from "./game/Overworld";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>RPG experiment</h1>
    <!--<div class="card">
      <button id="counter" type="button"></button>
    </div>-->
    <p>
      Check out <a
        href="https://www.youtube.com/watch?v=fyi4vfbKEeo"
        target="_blank"
        rel="noreferrer"><em style="font-style: italic;">Let's build an RPG with JavaScript</em></a
      > series by Drew Conley on YouTube
    </p>
    <div class="game-container">
      <canvas class="game-canvas" width="352" height="198" />
    </div>
  </div>
`;

const element = document.querySelector<HTMLCanvasElement>(".game-container")!;

new Overworld({
  element,
}).init();

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
