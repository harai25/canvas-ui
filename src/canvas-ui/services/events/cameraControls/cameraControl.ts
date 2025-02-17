import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "~/services/render";

export interface ICamera {
  moveX: number;
  moveY: number;
  zoomRatio: number;
}

export function createCameraControl(
  canvasManager: ICanvasManager,
  renderManager: IRenderManager
) {
  const { width, height } = canvasManager.getCanvasSize();
  let prevCamera: ICamera = {
    moveX: 0,
    moveY: 0,
    zoomRatio: 1,
  };
  const camera: ICamera = {
    moveX: 0,
    moveY: 0,
    zoomRatio: 1,
  };

  const cameraAdditionalInfo = {
    moveXOnStartMove: 0,
    moveYOnStartMove: 0,
  }

  let isRenderOnEndTick = false;

  function render() {
    if (!isRenderOnEndTick) {
      Promise.resolve().then(() => {
        renderManager.render(
          camera.moveX,
          camera.moveY,
          width,
          height,
          camera.zoomRatio
        );
        isRenderOnEndTick = false;
      });
    }
    isRenderOnEndTick = true;
  }

  const setCamera = ({
    moveX = camera.moveX,
    moveY = camera.moveY,
    zoomRatio = camera.zoomRatio,
  }: Partial<ICamera>) => {
    prevCamera = { ...camera };
    camera.moveX = moveX;
    camera.moveY = moveY;
    camera.zoomRatio = zoomRatio;

    render();
  };

  function getPointerCoord(x: number, y: number) {
    return [
      (camera.moveX + x) / camera.zoomRatio,
      (camera.moveY + y) / camera.zoomRatio,
    ];
  }

  return {
    getCamera: () => ({ ...camera }),
    setCamera,
    getPrevCamera: () => ({ ...prevCamera }),
    getPointerCoord,
    getCanvasSize: () => ({width, height}),
    cameraAdditionalInfo
  };
}

export type ICameraControl = ReturnType<typeof createCameraControl>;
