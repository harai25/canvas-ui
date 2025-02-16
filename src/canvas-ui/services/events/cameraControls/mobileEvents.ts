import type { ICanvasManager } from "~/canvas";
import type { IMoveControl } from "./move";
import type { IZoomControl } from "./zoom";

export function initMobileEvents(canvasManager: ICanvasManager, moveControl: IMoveControl, zoomControl: IZoomControl) {

  let startFingersDistance = 0
  let centerX = 0
  let centerY = 0
  // let startZoom = 0

  function getFingersDistance(event: TouchEvent) {
    const x = Math.abs(event.touches[0].clientX - event.touches[1].clientX)
    const y = Math.abs(event.touches[0].clientY - event.touches[1].clientY)
    return Math.sqrt(x * x + y * y)
  }


  canvasManager.eventsMethods.addEvent("touchmove", (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      moveControl.scroll(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      const currentFingersDistance = getFingersDistance(e)
      centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2
      centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2
      zoomControl.zoomRelativeStartZoom(centerX, centerY, (currentFingersDistance / startFingersDistance))
    }
  });
  canvasManager.eventsMethods.addEvent("touchstart", (e) => {
    if (e.touches.length === 1) {
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      zoomControl.initZoom()
      startFingersDistance = getFingersDistance(e)
    }
  });
  canvasManager.eventsMethods.addEvent("touchend", (e) => {
    if (e.touches.length === 1) {
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY);
    }
    if (!e.touches.length) {
      moveControl.pointerup();
    }
  });

}
