import type { ICanvasManager } from "~/canvas";
import type { ICamera } from ".";

const ZOOM_STEP = 0.1;

export function initZoom(canvasManager: ICanvasManager, cameraPointer: ICamera, renderCamera: () => void) {
  function wheelZoom(event: WheelEvent) {
    event.preventDefault();

    // Координаты курсора мыши в мировых координатах до изменения масштаба
    const pointerX = (cameraPointer.moveX + event.x) / cameraPointer.zoomRatio;
    const pointerY = (cameraPointer.moveY + event.y) / cameraPointer.zoomRatio;

    let dRatio = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const prevZoomRatio = cameraPointer.zoomRatio;
    cameraPointer.zoomRatio = Math.max(cameraPointer.zoomRatio + dRatio, 0.4);

    // Корректируем смещение для приближения в курсор
    cameraPointer.moveX += pointerX * (cameraPointer.zoomRatio - prevZoomRatio);
    cameraPointer.moveY += pointerY * (cameraPointer.zoomRatio - prevZoomRatio);

    renderCamera();
  }

  canvasManager.eventsMethods.addEvent("wheel", wheelZoom)
}