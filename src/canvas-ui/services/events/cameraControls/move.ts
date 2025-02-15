import type { ICanvasManager } from "~/canvas";
import type { ICamera } from ".";
import { animate, easeOutQuad } from "~/helpers/animation";

const RUN_MULTIPLY = 2

export function initMove(canvasManager: ICanvasManager, cameraPointer: ICamera, renderCamera: () => void) {

  let timeout: NodeJS.Timeout | null = null;

  let xDown = 0;
  let yDown = 0;
  
  let lastMoveX = 0;
  let lastMoveY = 0;
  let preLastMoveX = 0;
  let preLastMoveY = 0;
  let isMove = false
  
  let controller: AbortController | null = null;

  let scroll: ReturnType<typeof createScroll> = () => {}
  function createScroll() {
    let createX = cameraPointer.moveX;
    let createY = cameraPointer.moveY;

    return (x: number, y: number) => {
      cameraPointer.moveX = createX - x;
      cameraPointer.moveY = createY - y;
      renderCamera()
    }
  }
  
  function pointermove(e: { x: number; y: number }) {
    isMove = true
    preLastMoveX = lastMoveX;
    preLastMoveY = lastMoveY;
    lastMoveX = e.x - xDown;
    lastMoveY = e.y - yDown;
    scroll(lastMoveX, lastMoveY);
  }
  
  function pointerup() {
    if (!isMove) {
      return;
    }
    isMove = false
    controller = new AbortController();
    animate(
      easeOutQuad,
      (progress) => {
        const x = lastMoveX + (lastMoveX - preLastMoveX) * RUN_MULTIPLY * progress
        const y = lastMoveY + (lastMoveY - preLastMoveY) * RUN_MULTIPLY * progress
        scroll(x, y);
      },
      300,
      controller.signal
    );
    if (timeout) {
      clearTimeout(timeout);
    }
  }
  
  function pointerdown(x: number, y: number) {
    scroll = createScroll()
    controller?.abort();
    xDown = x;
    yDown = y;
  }
  
  function desktopEvents() {
    let cancelMousemoveEvent: () => void = () => {}
    canvasManager.eventsMethods.addEvent("mousedown", e => {
      pointerdown(e.x, e.y)
      timeout = setTimeout(() => {
        cancelMousemoveEvent = canvasManager.eventsMethods.addEvent("mousemove", pointermove)
      }, 50);
    })
  
    canvasManager.eventsMethods.addEvent("mouseup", () => {
      pointerup()
      cancelMousemoveEvent()
    });
  }
  function mobileEvents() {
    canvasManager.eventsMethods.addEvent("touchmove", (e) => {
      pointermove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    });
    canvasManager.eventsMethods.addEvent("touchstart", (e) => {
      pointerdown(e.touches[0].clientX, e.touches[0].clientY)
    });
    canvasManager.eventsMethods.addEvent("touchend", pointerup);
  }
  desktopEvents()
  mobileEvents()
}