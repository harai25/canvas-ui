import type { ICanvasManager } from "~/canvas";

export interface IRenderElement {
  x: number;
  y: number;
  width: number;
  height: number;
  render: () => void;
}
const SECTOR_SIZE = 150;

export function createRenderManager(canvasManager: ICanvasManager) {
  const sectors: IRenderElement[][][] = [];

  function getSector(j: number, i: number) {
    return sectors[i]?.[j];
  }

  function addInSector(j: number, i: number, element: IRenderElement) {
    if (!sectors[i]) {
      sectors[i] = [];
    }
    if (!sectors[i][j]) {
      sectors[i][j] = [];
    }
    sectors[i][j].push(element);
  }

  function attachElement(element: IRenderElement) {
    const ax = Math.floor(element.x / SECTOR_SIZE);
    const ay = Math.floor(element.y / SECTOR_SIZE);
    const bx = Math.floor((element.x + element.width) / SECTOR_SIZE);
    const by = Math.floor((element.y + element.height) / SECTOR_SIZE);
    for (let i = ax; i <= bx; i++) {
      for (let j = ay; j <= by; j++) {
        addInSector(i, j, element);
      }
    }
  }

  function attachElements(objects: IRenderElement[]) {
    objects.forEach(attachElement);
  }

  function renderVisibleSectors(
    x: number = 0,
    y: number = 0,
    width: number = canvasManager.getCanvasSize().width,
    height: number = canvasManager.getCanvasSize().height,
    zoom: number = 1
  ) {
    const ax = Math.floor(x / SECTOR_SIZE / zoom);
    const ay = Math.floor(y / SECTOR_SIZE / zoom);
    const bx = Math.floor((x + width) / SECTOR_SIZE / zoom);
    const by = Math.floor((y + height) / SECTOR_SIZE / zoom);
    for (let i = ax; i <= bx; i++) {
      for (let j = ay; j <= by; j++) {
        const sector = getSector(i, j);
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
    attachElement,
    attachElements,
    render,
  };
}

export type IRenderManager = ReturnType<typeof createRenderManager>;
