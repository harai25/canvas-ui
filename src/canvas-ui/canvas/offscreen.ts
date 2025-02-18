export function createOffscreenMethods(
  ctx: CanvasRenderingContext2D,
  getCanvasSize: () => { width: number; height: number },
) {
  const offscreenCanvas = document.createElement('canvas');
  const offscreenCtx = offscreenCanvas.getContext('2d');
  offscreenCanvas.width = getCanvasSize().width;
  offscreenCanvas.height = getCanvasSize().height;
  
  function get() {
    return ctx.getImageData(0, 0, getCanvasSize().width, getCanvasSize().height)
  }

  function put(imageData: ImageData, x: number, y: number) {
    ctx.putImageData(imageData, x, y)
  }

  return { get, put }
}
export type IOffscreenMethods = ReturnType<typeof createOffscreenMethods>
