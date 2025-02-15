import type { ICanvasManager } from "~/canvas";
import { createMethodText } from "./text";
import type { IRenderManager } from "~/services/render";
import type { IServicesManager } from "~/services";

export function createAtoms(canvasManager: ICanvasManager, servicesManager: IServicesManager) {
  return {
    text: createMethodText(canvasManager, servicesManager)
  }
}

export type IAtoms = ReturnType<typeof createAtoms>