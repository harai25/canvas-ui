import type { ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import { createAbsolute } from "./absolute";
import { createRows } from "./rows";
import type { IServicesManager } from "~/services";
import { createColumns } from "./columns";

export function createMolecules(canvasManager: ICanvasManager, servicesManager: IServicesManager, atoms: IAtoms) {
  return {
    // text: createMethodText(canvasManager)
    absolute: createAbsolute(canvasManager, servicesManager, atoms),
    rows: createRows(canvasManager, servicesManager, atoms),
    columns: createColumns(canvasManager, servicesManager, atoms),
  }
}