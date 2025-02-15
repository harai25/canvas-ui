import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../render";
import { initCameraControl } from "./cameraControls";

export function createEventsManager(canvasManager: ICanvasManager, renderManager: IRenderManager) {
  return {
    init: () => {
      initCameraControl(canvasManager, renderManager)
    }
  }
}