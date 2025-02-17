import { animate, easeOutQuad, throttleAnimate } from "~/helpers/animation";
import type { ICameraControl } from "./cameraControl";

const INNERTION_FACTOR = 30;
const INNERTION_TIME = 800;

export function createMoveControl(cameraControl: ICameraControl) {
  let isMove = false;

  let innertionAbort: AbortController | null = null;
  let pointerDownX = 0;
  let pointerDownY = 0;

  function move(x: number, y: number) {
    isMove = true;
    cameraControl.setCamera({
      moveX:
        cameraControl.cameraAdditionalInfo.moveXOnStartMove - x + pointerDownX,
      moveY:
        cameraControl.cameraAdditionalInfo.moveYOnStartMove - y + pointerDownY,
    });
  }

  function pointerdown(x: number, y: number) {
    const camera = cameraControl.getCamera();
    cameraControl.cameraAdditionalInfo.moveXOnStartMove = camera.moveX;
    cameraControl.cameraAdditionalInfo.moveYOnStartMove = camera.moveY;
    pointerDownX = x;
    pointerDownY = y;
    innertionAbort?.abort();
  }

  function pointerup() {
    if (!isMove) {
      return;
    }
    isMove = false;
    innertionAbort = new AbortController();
    const camera = cameraControl.getCamera();
    const diffX = camera.moveX - cameraControl.getPrevCamera().moveX;
    const diffY = camera.moveY - cameraControl.getPrevCamera().moveY;
    animate(
      easeOutQuad,
      (progress) => {
        cameraControl.setCamera({
          moveX: camera.moveX + diffX * INNERTION_FACTOR * progress,
          moveY: camera.moveY + diffY * INNERTION_FACTOR * progress,
        });
      },
      INNERTION_TIME,
      innertionAbort.signal
    );
  }

  function stopActiveMove() {
    isMove = false;
    innertionAbort?.abort();
  }

  return {
    pointerdown,
    pointerup,
    move: throttleAnimate(move),
    stopActiveMove,
  };
}

export type IMoveControl = ReturnType<typeof createMoveControl>;
