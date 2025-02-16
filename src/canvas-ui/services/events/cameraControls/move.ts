import type { ICanvasManager } from "~/canvas";
import { animate, easeOutQuad, throttleAnimate } from "~/helpers/animation";
import type { ICameraControl } from "./cameraControl";

const INNERTION_FACTOR = 30
const INNERTION_TIME = 1000

// const RUN_MULTIPLY = 100
// const RUN_TIME = 2000

export function initMove(canvasManager: ICanvasManager, cameraControl: ICameraControl) {

  let isMove = false
  
  let innertionAbort: AbortController | null = null;

  let scroll: ReturnType<typeof createScroll> = () => {}
  function createScroll(pointerDownX: number, pointerDownY: number) {
    const { moveX, moveY} = cameraControl.getCamera()

    return throttleAnimate((x: number, y: number) => {
      isMove = true
      cameraControl.setCamera({
        moveX: moveX - x + pointerDownX,
        moveY: moveY - y + pointerDownY,
      })
    })
  }
  
  
  function pointerup() {
    if (!isMove) {
      return;
    }
    isMove = false
    innertionAbort = new AbortController();
    const camera = cameraControl.getCamera()
    const prevCamera = cameraControl.getPrevCamera()
    animate(
      easeOutQuad,
      (progress) => {
        const moveX = camera.moveX + (camera.moveX - prevCamera.moveX) * INNERTION_FACTOR * progress
        const moveY = camera.moveY + (camera.moveY - prevCamera.moveY) * INNERTION_FACTOR * progress
        cameraControl.setCamera({
          moveX,
          moveY,
        })
      },
      INNERTION_TIME,
      innertionAbort.signal
    );
    
  }
  
  function pointerdown(x: number, y: number) {
    scroll = createScroll(x, y)
    innertionAbort?.abort();
  }

  function desktopEvents() {
    let mouseDownTimeout: NodeJS.Timeout | null = null;
    let cancelMousemoveEvent: () => void = () => {}
    canvasManager.eventsMethods.addEvent("mousedown", eventMouseDown => {
      pointerdown(eventMouseDown.x, eventMouseDown.y)
      mouseDownTimeout = setTimeout(() => {
        cancelMousemoveEvent = canvasManager.eventsMethods.addEvent("mousemove", eventMouseMove => {
          eventMouseDown.preventDefault()
          scroll(eventMouseMove.x, eventMouseMove.y)
        })
      }, 50);
    })
  
    canvasManager.eventsMethods.addEvent("mouseup", () => {
      pointerup()
      if (mouseDownTimeout) {
        clearTimeout(mouseDownTimeout);
      }
      cancelMousemoveEvent()
    });
  }
  function mobileEvents() {
    canvasManager.eventsMethods.addEvent("touchmove", (e) => {
      e.preventDefault()
      if (e.touches.length === 1) {
        scroll(e.touches[0].clientX, e.touches[0].clientY)
      }
    });
    canvasManager.eventsMethods.addEvent("touchstart", (e) => {
      if (e.touches.length === 1) {
        pointerdown(e.touches[0].clientX, e.touches[0].clientY)
      }

    });
    canvasManager.eventsMethods.addEvent("touchend", (e) => {
      if (e.touches.length === 1) {
        pointerdown(e.touches[0].clientX, e.touches[0].clientY)
      }
      if (!e.touches.length) {
        pointerup()
      }
    });
  }
  desktopEvents()
  mobileEvents()
}
