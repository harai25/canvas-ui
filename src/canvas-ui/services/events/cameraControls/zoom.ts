import type { ICanvasManager } from "~/canvas";
import type { ICameraControl } from "./cameraControl";

export function initZoom(canvasManager: ICanvasManager, cameraControl: ICameraControl) {
  function zoom(x: number, y: number, zoom: number) {
    // Координаты курсора мыши в мировых координатах до изменения масштаба
    const camera = cameraControl.getCamera()
    const pointerX = (camera.moveX + x) / camera.zoomRatio;
    const pointerY = (camera.moveY + y) / camera.zoomRatio;

    const prevZoomRatio = camera.zoomRatio;

    const zoomRatio = Math.max(zoom, 0.4)
    const moveX = camera.moveX + pointerX * (zoomRatio - prevZoomRatio)
    const moveY = camera.moveY + pointerY * (zoomRatio - prevZoomRatio)
    cameraControl.setCamera({
      moveX,
      moveY,
      zoomRatio,
    })

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
        startZoom = cameraControl.getCamera().zoomRatio
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
      zoom(event.x, event.y, cameraControl.getCamera().zoomRatio + dRatio)
    }

    canvasManager.eventsMethods.addEvent("wheel", wheelZoom)
  }

  desktopEvents()
  // mobileEvents()
}