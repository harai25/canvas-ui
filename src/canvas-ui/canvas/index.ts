import { createRectangleMethods } from "./rectangle";
import { createTextMethods } from "./text";
import { createRenderMethods } from "./render";
import { createEventsMethods } from "./events";

export function createCanvasManager(canvas: HTMLCanvasElement) {
  if (!canvas) {
    throw new Error("Нет канвас");
  }
  const ctx = canvas.getContext("2d")!;
  if (!ctx) {
    throw new Error("Нет 2d");
  }

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  ctx.textBaseline = "top";

  return {
    rectangleMethods: createRectangleMethods(ctx),
    textMethods: createTextMethods(ctx),
    renderMethods: createRenderMethods(ctx),
    eventsMethods: createEventsMethods(ctx),
    getCanvasSize: () => {
      return {
        width: canvas.width,
        height: canvas.height
      }
    }
  };
}

export type ICanvasManager = ReturnType<typeof createCanvasManager>
