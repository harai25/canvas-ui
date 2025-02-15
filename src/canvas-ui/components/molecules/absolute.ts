import type { ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import type { IRenderManager } from "~/services/render";
import type { IServicesManager } from "~/services";

interface IAbsoluteRender {
  x: number,
  y: number;
  width?: number;
  height?: number;
  background?: string;
}

export function createAbsolute(canvasManager: ICanvasManager, servicesManager: IServicesManager, atoms: IAtoms) {
  return (params: IAbsoluteRender) => {
    servicesManager.renderManager.attachElement({
      x: params.x,
      y: params.y,
      width: params.width ?? 0,
      height: params.height ?? 0,
      render: () => {
        canvasManager.rectangleMethods.drawRectangle(params)
      }
    })
  }
}
