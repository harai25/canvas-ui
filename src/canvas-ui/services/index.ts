import type { ICanvasManager } from "~/canvas";
import { createRenderManager } from "./render";
import { createEventsManager } from "./events/eventsManager";

export function createServicesManager(canvasManager: ICanvasManager) {
  const renderManager = createRenderManager(canvasManager)
  const eventsManager = createEventsManager(canvasManager, renderManager)

  return {
    renderManager, eventsManager
  }
}

export type IServicesManager = ReturnType<typeof createServicesManager>