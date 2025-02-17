import type { ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import { createAbsolute } from "./absolute";
import type { IServicesManager } from "~/services";
import { createLayoutDirectionals } from "./layoutDirectional";

export function createMolecules(canvasManager: ICanvasManager, servicesManager: IServicesManager, atoms: IAtoms) {
  const layoutDirectional = createLayoutDirectionals(canvasManager, servicesManager, atoms)
  return {
    // text: createMethodText(canvasManager)
    absolute: createAbsolute(canvasManager, servicesManager, atoms),
    rows: layoutDirectional.rows,
    columns: layoutDirectional.columns,
  }
}