export function createTextMethods(ctx: CanvasRenderingContext2D) {
  function drawText(params: {
    x: number;
    y: number;
    text: string;
    fontSize?: number;
    color?: string;
  }) {
    ctx.font = `${params.fontSize}px serif`;
    ctx.fillStyle = params.color ?? "black";
    ctx.fillText(params.text, params.x, params.y);
  }

  function styleText(params: { fontSize?: number; color?: string }) {
    ctx.font = `${params.fontSize}px serif`;
    ctx.fillStyle = params.color ?? "black";
  }

  function fillText(params: { x: number; y: number; text: string }) {
    ctx.fillText(params.text, params.x, params.y);
  }

  function measureText(text: string) {
    return ctx.measureText(text);
  }

  return { drawText, styleText, fillText, measureText };
}
