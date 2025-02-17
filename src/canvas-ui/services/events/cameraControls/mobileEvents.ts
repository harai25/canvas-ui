import type { ICanvasManager } from "~/canvas";
import type { IMoveControl } from "./move";
import type { IZoomControl } from "./zoom";

export function initMobileEvents(
  canvasManager: ICanvasManager,
  moveControl: IMoveControl,
  zoomControl: IZoomControl
) {
  let startFingersDistance = 0;

  function getFingersDistance(event: TouchEvent) {
    const x = Math.abs(event.touches[0].clientX - event.touches[1].clientX);
    const y = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
    return Math.sqrt(x * x + y * y);
  }

  function getFingersCenter(e: TouchEvent): [number, number] {
    return [
      (e.touches[0].clientX + e.touches[1].clientX) / 2,
      (e.touches[0].clientY + e.touches[1].clientY) / 2,
    ];
  }

  canvasManager.eventsMethods.addEvent("touchmove", (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      moveControl.move(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      const currentFingersDistance = getFingersDistance(e);
      zoomControl.zoomRelativeStartZoom(...getFingersCenter(e), currentFingersDistance / startFingersDistance);

      const center = getFingersCenter(e)
      moveControl.move(center[0], center[1]);
    }
  });
  canvasManager.eventsMethods.addEvent("touchstart", (e) => {
    if (e.touches.length === 1) {
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      zoomControl.initZoom();
      startFingersDistance = getFingersDistance(e);

      moveControl.pointerdown(...getFingersCenter(e));
    }
  });
  canvasManager.eventsMethods.addEvent("touchend", (e) => {
    if (e.touches.length === 1) {
      moveControl.stopActiveMove()
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY);
    }
    if (!e.touches.length) {
      moveControl.pointerup();
    }
  });
}
