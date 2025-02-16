import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../render";
import { initCameraControls } from "./cameraControls";
import type { ISectorManager } from "../sectors";

export function createEventsManager(canvasManager: ICanvasManager, sectorManager: ISectorManager, renderManager: IRenderManager) {
  return {
    init: () => {
      initCameraControls(canvasManager, renderManager)
    }
  }
}