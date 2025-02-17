import type { ICanvasManager } from "~/canvas";
import type { ISectorElement, ISectorManager } from "../sectors";
import type { ICameraControlsManager } from "./cameraControls";

export function createComponentsEvents(
  canvasManager: ICanvasManager,
  sectorManager: ISectorManager,
  cameraControlsManager: ICameraControlsManager,
) {

  function findInSector(x: number, y: number, sector: ISectorElement[]) {
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
      const sector = sectorManager.getSector(
        Math.floor(e.x / sectorManager.SECTOR_SIZE),
        Math.floor(e.y / sectorManager.SECTOR_SIZE)
      );
      if (sector) {
        const camera = cameraControlsManager.cameraControl.getCamera()
        const el = findInSector(camera.moveX + e.x, camera.moveY + e.y, sector);
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
