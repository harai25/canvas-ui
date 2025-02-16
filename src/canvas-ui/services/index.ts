import type { ICanvasManager } from "~/canvas";
import { createRenderManager } from "./render";
import { createEventsManager } from "./events/eventsManager";
import { createSectorsManager } from "./sectors";

export function createServicesManager(canvasManager: ICanvasManager) {
  const sectorManager = createSectorsManager()
  const renderManager = createRenderManager(canvasManager, sectorManager)
  const eventsManager = createEventsManager(canvasManager, sectorManager, renderManager)

  return {
    sectorManager, renderManager, eventsManager
  }
}

export type IServicesManager = ReturnType<typeof createServicesManager>