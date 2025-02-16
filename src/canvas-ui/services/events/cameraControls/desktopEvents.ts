import type { ICanvasManager } from "~/canvas";
import type { IMoveControl } from "./move";
import type { IZoomControl } from "./zoom";

const ZOOM_STEP = 0.1;

export function initDesktopEvents(
  canvasManager: ICanvasManager,
  moveControl: IMoveControl,
  zoomControl: IZoomControl
) {
  let mouseDownTimeout: NodeJS.Timeout | null = null;
  let cancelMousemoveEvent: () => void = () => {};
  canvasManager.eventsMethods.addEvent("mousedown", (eventMouseDown) => {
    moveControl.pointerdown(eventMouseDown.x, eventMouseDown.y);
    mouseDownTimeout = setTimeout(() => {
      cancelMousemoveEvent = canvasManager.eventsMethods.addEvent(
        "mousemove",
        (eventMouseMove) => {
          eventMouseDown.preventDefault();
          moveControl.scroll(eventMouseMove.x, eventMouseMove.y);
        }
      );
    }, 50);
  });

  canvasManager.eventsMethods.addEvent("mouseup", () => {
    moveControl.pointerup();
    if (mouseDownTimeout) {
      clearTimeout(mouseDownTimeout);
    }
    cancelMousemoveEvent();
  });

  canvasManager.eventsMethods.addEvent("wheel", (event) => {
    event.preventDefault();
    const dRatio = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    zoomControl.modifyZoom(event.x, event.y, dRatio);
  });
}
