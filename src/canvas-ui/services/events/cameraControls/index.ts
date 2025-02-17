import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../../render";
import { createMoveControl } from "./move";
import { createZoomControl } from "./zoom";
import { createCameraControl } from "./cameraControl";
import { initDesktopEvents } from "./desktopEvents";
import { initMobileEvents } from "./mobileEvents";



export function createCameraControlsManager(canvasManager: ICanvasManager, renderManager: IRenderManager) {
  const cameraControl = createCameraControl(canvasManager, renderManager)
  const moveControl = createMoveControl(cameraControl)
  const zoomControl = createZoomControl(cameraControl)
  return {
    cameraControl, moveControl, zoomControl,
    init: () => {
      initDesktopEvents(canvasManager, moveControl, zoomControl)
      initMobileEvents(canvasManager, moveControl, zoomControl)
    }
  }
}

export type ICameraControlsManager = ReturnType<typeof createCameraControlsManager>