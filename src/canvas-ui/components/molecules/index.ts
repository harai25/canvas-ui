import type { ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import { createAbsolute } from "./absolute";
import { createRows } from "./rows";
import type { IRenderManager } from "~/services/render";
import type { IServicesManager } from "~/services";

export function createMolecules(canvasManager: ICanvasManager, servicesManager: IServicesManager, atoms: IAtoms) {
  return {
    // text: createMethodText(canvasManager)
    absolute: createAbsolute(canvasManager, servicesManager, atoms),
    rows: createRows(canvasManager, servicesManager, atoms),
  }
}