<script lang="ts">
  import { Overworld } from "../game/Overworld";

  let ref: HTMLElement;
  let overworld: Overworld;

  $: {
    if (ref) {
      overworld = new Overworld({
        element: ref,
      });
      overworld.init();
    }
  }
</script>

<div bind:this={ref} class="game-container">
  <canvas class="game-canvas" width="352" height="198" />
</div>

<style>
  .game-container {
    position: relative;
    width: 352px;
    height: 198px;
    outline: 1px solid #fff;
    margin: 0 auto;
    transform: scale(1) translateY(50%);
  }

  @media (min-width: 704px) {
    .game-container {
      transform: scale(2) translateY(50%);
    }
  }
  @media (min-width: 1056px) {
    .game-container {
      transform: scale(3) translateY(50%);
    }
  }

  :global(.game-container canvas) {
    image-rendering: pixelated;
  }

  @media (prefers-color-scheme: light) {
    .game-container {
      outline-color: #000;
    }
  }
</style>
