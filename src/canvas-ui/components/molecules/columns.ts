import { type ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import type { IServicesManager } from "~/services";
import type { ISectorElement } from "~/services/sectors";
import type { IComponentConfig } from "~/types/component";

export interface IColumnElement {
  marginLeft?: number;
  marginTop?: number;
  width: number;
  height: number;
  color?: string;
  content?: string;
  background?: string;
  click?: () => void;
}

export function createColumns(
  canvasManager: ICanvasManager,
  servicesManager: IServicesManager,
  atoms: IAtoms
) {
  return (elements: IColumnElement[], config: IComponentConfig = {}) => {
    let x = config.x ?? 0;
    let y = config.y ?? 0;

    const renderElements: ISectorElement[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      x += element.marginLeft ?? 0;
      const width = element.width;
      const height = element.height;
      const currX = x;
      const currY = y + (element.marginTop ?? 0);
      renderElements.push({
        x,
        y,
        width,
        height,
        render: () => {
          canvasManager.rectangleMethods.drawRectangle({
            x: currX,
            y: currY,
            width,
            height,
            background: element.background ?? "black",
          });
          if (element.content) {
            atoms.text({
              content: element.content,
              color: element.color,
              x: currX,
              y: currY,
              width,
              fontSize: 24,
            });
          }
        },
        events: {
          click: element.click,
        },
      });

      x += width;
    }

    servicesManager.sectorManager.attachElements(renderElements);
  };
}
