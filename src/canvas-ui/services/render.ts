import type { ICanvasManager } from "~/canvas";
import type { ISectorManager } from "./sectors";

export function createRenderManager(canvasManager: ICanvasManager, sectorManager: ISectorManager) {

  function renderVisibleSectors(
    x: number = 0,
    y: number = 0,
    width: number = canvasManager.getCanvasSize().width,
    height: number = canvasManager.getCanvasSize().height,
    zoom: number = 1
  ) {
    const ax = Math.floor(x / sectorManager.SECTOR_SIZE / zoom);
    const ay = Math.floor(y / sectorManager.SECTOR_SIZE / zoom);
    const bx = Math.floor((x + width) / sectorManager.SECTOR_SIZE / zoom);
    const by = Math.floor((y + height) / sectorManager.SECTOR_SIZE / zoom);
    for (let i = ax; i <= bx; i++) {
      for (let j = ay; j <= by; j++) {
        const sector = sectorManager.getSector(i, j);
        if (sector) {
          sector.forEach((e) => {
            e.render();
          });
        }
      }
    }
  }

  function render(
    x: number = 0,
    y: number = 0,
    width: number = canvasManager.getCanvasSize().width,
    height: number = canvasManager.getCanvasSize().height,
    zoom: number = 1
  ) {
    canvasManager.renderMethods.render(x, y, width, height, zoom, renderVisibleSectors);
  }

  return {
    render,
  };
}

export type IRenderManager = ReturnType<typeof createRenderManager>;
