import type { ICanvasManager } from "~/canvas";
import type { ISectorManager } from "./sectors";

export function createRenderManager(canvasManager: ICanvasManager, sectorManager: ISectorManager) {

  let prevX = 0
  let prevY = 0
  let imageData: ImageData | null = null

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
          for (let i = 0; i<sector.length; i++) {
            sector[i].render()
          }
        }
      }
    }

    // imageData = canvasManager.imageDataMethods.get()
  }

  // function renderVisible(
  //   x: number = 0,
  //   y: number = 0,
  //   width: number = canvasManager.getCanvasSize().width,
  //   height: number = canvasManager.getCanvasSize().height,
  //   zoom: number = 1
  // ) {
  //   // console.log(x, y, prevX, prevY)
    
  //   // console.log(x - prevX, y - prevY)
  //   canvasManager.imageDataMethods.put(imageData!, -x, -y)

  //   // prevX = x
  //   // prevY = y
  // }

  function firstRender(x: number = 0,
    y: number = 0,
    width: number = canvasManager.getCanvasSize().width,
    height: number = canvasManager.getCanvasSize().height,
    zoom: number = 1
  ) {
    canvasManager.renderMethods.render(x, y, width, height, zoom, renderVisibleSectors);
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
    render, firstRender
  };
}

export type IRenderManager = ReturnType<typeof createRenderManager>;
