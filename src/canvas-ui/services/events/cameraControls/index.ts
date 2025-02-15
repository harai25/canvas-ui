import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../../render";
import { initMove } from "./move";
import { initZoom } from "./zoom";

export interface ICamera {
  moveX: number,
  moveY: number,
  zoomRatio: number,
}

export function initCameraControl(canvasManager: ICanvasManager, renderManager: IRenderManager) {
  const camera: ICamera = {
    moveX: 0,
    moveY: 0,
    zoomRatio: 1,
  }
  const renderCamera = () => {
    const {width, height} = canvasManager.getCanvasSize()
    renderManager.render(camera.moveX, camera.moveY, width, height, camera.zoomRatio)
  }

  initMove(canvasManager, camera, renderCamera)
  initZoom(canvasManager, camera, renderCamera)
}