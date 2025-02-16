import { animate, easeOutQuad, throttleAnimate } from "~/helpers/animation";
import type { ICameraControl } from "./cameraControl";

const INNERTION_FACTOR = 30
const INNERTION_TIME = 1000

// const RUN_MULTIPLY = 100
// const RUN_TIME = 2000

export function createMoveControl(cameraControl: ICameraControl) {

  let isMove = false
  
  let innertionAbort: AbortController | null = null;
  let pointerDownX = 0
  let pointerDownY = 0
  let startMoveX = 0
  let startMoveY = 0

  function scroll(x: number, y: number) {
    isMove = true
    cameraControl.setCamera({
      moveX: startMoveX - x + pointerDownX,
      moveY: startMoveY - y + pointerDownY,
    })
  }

  function pointerdown(x: number, y: number) {
    const camera = cameraControl.getCamera()
    startMoveX = camera.moveX
    startMoveY = camera.moveY
    pointerDownX = x
    pointerDownY = y
    innertionAbort?.abort();
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
  
  return {
    pointerdown, pointerup, scroll: throttleAnimate(scroll)
  }
}

export type IMoveControl = ReturnType<typeof createMoveControl>
