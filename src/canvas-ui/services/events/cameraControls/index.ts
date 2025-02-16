import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../../render";
import { initMove } from "./move";
import { initZoom } from "./zoom";
import { createCameraControl } from "./cameraControl";



export function initCameraControls(canvasManager: ICanvasManager, renderManager: IRenderManager) {
  const cameraControl = createCameraControl(canvasManager, renderManager)
  initMove(canvasManager, cameraControl)
  initZoom(canvasManager, cameraControl)
}