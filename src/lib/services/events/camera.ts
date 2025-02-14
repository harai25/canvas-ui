import { canvas } from "../../canvas";
import { draw, throttleDraw } from "../../render/render";

const SCROLL_RATIO = 0.15;
const ZOOM_STEP = 0.1;

let moveX = 0;
let moveY = 0;
let zoomRatio = 1;

function drawRelativeCamera() {
  requestAnimationFrame(() => {
    throttleDraw(moveX, moveY, canvas.width, canvas.height, zoomRatio);
  });
}

export function createScroll() {
  let createX = moveX;
  let createY = moveY;
  return (x: number, y: number) => {
    moveX = createX - x;
    moveY = createY - y;
    drawRelativeCamera();
  };
}

export function updateScroll(deltaX: number, deltaY: number) {
  moveX += deltaX * SCROLL_RATIO;
  moveY += deltaY * SCROLL_RATIO;
  drawRelativeCamera();
}

export function wheelZoom(event: WheelEvent) {
  event.preventDefault();

  // Координаты курсора мыши в мировых координатах до изменения масштаба
  const pointerX = (moveX + event.x) / zoomRatio;
  const pointerY = (moveY + event.y) / zoomRatio;

  let dRatio = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
  const prevZoomRatio = zoomRatio;
  zoomRatio = Math.max(zoomRatio + dRatio, 0.4);

  // Корректируем смещение для приближения в курсор
  moveX += pointerX * (zoomRatio - prevZoomRatio);
  moveY += pointerY * (zoomRatio - prevZoomRatio);

  drawRelativeCamera();
}
