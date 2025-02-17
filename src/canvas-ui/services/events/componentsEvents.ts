import type { ICanvasManager } from "~/canvas";
import type { ISectorElement, ISectorManager } from "../sectors";
import type { ICameraControlsManager } from "./cameraControls";

export function createComponentsEvents(
  canvasManager: ICanvasManager,
  sectorManager: ISectorManager,
  cameraControlsManager: ICameraControlsManager,
) {

  function findInSector(sector: ISectorElement[], x: number, y: number) {
    for (let i = 0; i < sector.length; i++) {
      const el = sector[i];
      if (
        x >= el.x &&
        y >= el.y &&
        x <= el.x + el.width &&
        y <= el.y + el.height
      ) {
        return el;
      }
    }
  }

  function initClickEvent() {
    canvasManager.eventsMethods.addEvent("click", (e) => {
      const pointerCoord = cameraControlsManager.cameraControl.getPointerCoord(e.x, e.y)
      const sector = sectorManager.getSector(
        Math.floor(pointerCoord[0] / sectorManager.SECTOR_SIZE),
        Math.floor(pointerCoord[1] / sectorManager.SECTOR_SIZE)
      );
      if (sector) {
        const el = findInSector(sector, pointerCoord[0], pointerCoord[1]);
        if (el) {
          el.events?.click?.()
        }
      }
    });
  }

  return {
    init: () => {
      initClickEvent()
    }
  }
}

export type IComponentsEvents = ReturnType<typeof createComponentsEvents>;
