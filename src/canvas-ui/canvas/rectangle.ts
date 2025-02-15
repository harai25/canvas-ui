export function createRectangleMethods(ctx: CanvasRenderingContext2D) {
  function drawRectangle(params: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    background?: string;
  }) {
    ctx.fillStyle = params.background ?? "black";
    ctx.fillRect(params.x, params.y, params.width ?? 0, params.height ?? 0);
  }

  return { drawRectangle };
}
