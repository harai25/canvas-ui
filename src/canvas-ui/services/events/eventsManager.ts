import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "../render";
import { createCameraControlsManager } from "./cameraControls";
import type { ISectorManager } from "../sectors";
import { createComponentsEvents } from "./componentsEvents";

export function createEventsManager(
  canvasManager: ICanvasManager,
  sectorManager: ISectorManager,
  renderManager: IRenderManager
) {
  const cameraControls = createCameraControlsManager(canvasManager, renderManager);
  const componentsEvents = createComponentsEvents(canvasManager, sectorManager, cameraControls);
  return {
    init: () => {
      cameraControls.init()
      componentsEvents.init()
    },
  };
}
