import type { ICanvasManager } from "~/canvas";
import { createAtoms } from "./atoms";
import { createMolecules } from "./molecules";
import type { IServicesManager } from "~/services";

export function createComponentsManager(canvasManager: ICanvasManager, servicesManager: IServicesManager) {
  const atoms = createAtoms(canvasManager, servicesManager)
  const molecules = createMolecules(canvasManager, servicesManager, atoms)

  return {
    atoms, molecules
  }
}

export type IComponentsManager = ReturnType<typeof createComponentsManager>