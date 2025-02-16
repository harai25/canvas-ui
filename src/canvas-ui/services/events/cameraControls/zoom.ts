import type { ICanvasManager } from "~/canvas";
import type { ICamera } from ".";

export function initZoom(canvasManager: ICanvasManager, cameraPointer: ICamera, renderCamera: () => void) {
  function zoom(x: number, y: number, zoom: number) {
    // Координаты курсора мыши в мировых координатах до изменения масштаба
    const pointerX = (cameraPointer.moveX + x) / cameraPointer.zoomRatio;
    const pointerY = (cameraPointer.moveY + y) / cameraPointer.zoomRatio;

    const prevZoomRatio = cameraPointer.zoomRatio;
    cameraPointer.zoomRatio = Math.max(zoom, 0.4)

    // Корректируем смещение для приближения в курсор
    cameraPointer.moveX += pointerX * (cameraPointer.zoomRatio - prevZoomRatio);
    cameraPointer.moveY += pointerY * (cameraPointer.zoomRatio - prevZoomRatio);

    renderCamera();
  }
  
  function mobileEvents() {
    let startFingersDistance = 0
    let centerX = 0
    let centerY = 0
    let startZoom = 0

    function getFingersDistance(event: TouchEvent) {
      const x = Math.abs(event.touches[0].clientX - event.touches[1].clientX)
      const y = Math.abs(event.touches[0].clientY - event.touches[1].clientY)
      return Math.sqrt(x * x + y * y)
    }
    function touchmove(event: TouchEvent) {
      event.preventDefault()
      if (event.touches.length >= 2) {
        const currentFingersDistance = getFingersDistance(event)
        zoom(centerX, centerY, startZoom * (currentFingersDistance / startFingersDistance))
      }
    }
    function touchstart(event: TouchEvent) {
      if (event.touches.length >= 2) {
        startZoom = cameraPointer.zoomRatio
        startFingersDistance = getFingersDistance(event)
        centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2
        centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2
      }
    }

    canvasManager.eventsMethods.addEvent("touchmove", touchmove)
    canvasManager.eventsMethods.addEvent("touchstart", touchstart)
  }

  function desktopEvents() {
    const ZOOM_STEP = 0.1;
    function wheelZoom(event: WheelEvent) {
      event.preventDefault();
      const dRatio = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      zoom(event.x, event.y, cameraPointer.zoomRatio + dRatio)
    }

    canvasManager.eventsMethods.addEvent("wheel", wheelZoom)
  }

  desktopEvents()
  // mobileEvents()
}