import { throttle } from "~/helpers/opt";

export function createRenderMethods(ctx: CanvasRenderingContext2D) {
  function render(
    x = 0,
    y = 0,
    width = window.innerWidth,
    height = window.innerHeight,
    zoom = 1,
    draw: (x: number, y: number, width: number, height: number, zoom: number) => void
  ) {
    requestAnimationFrame(() => {
      ctx.resetTransform();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.setTransform(1 * zoom, 0, 0, 1 * zoom, -x, -y);
      
      draw(x, y, width, height, zoom);
    })
  }

  const throttleRender = throttle(render, 0)

  return {
    render,
    throttleRender
  };
}
