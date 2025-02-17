import { type ICanvasManager } from "~/canvas";
import type { IAtoms } from "../atoms";
import type { IServicesManager } from "~/services";
import type { ISectorElement } from "~/services/sectors";
import type { IComponent } from "~/types/component";

export interface IComponentConfig {
  x?: number;
  y?: number;
  color?: string;
  direction: "vert" | "horyz";
}

export function createLayoutDirectionals(
  canvasManager: ICanvasManager,
  servicesManager: IServicesManager,
  atoms: IAtoms
) {
  function layoutDirectional(elements: IComponent[], config: IComponentConfig) {
    let x = config.x ?? 0;
    let y = config.y ?? 0;
    const renderElements: ISectorElement[] = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      let currX = x;
      let currY = y;
      if (config.direction === "vert") {
        y += element.marginTop ?? 0;
        currX = x + (element.marginLeft ?? 0);
      } else {
        x += element.marginLeft ?? 0;
        currY = y + (element.marginTop ?? 0);
      }
      const width = element.width;
      const height = element.height;
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

      if (config.direction === "vert") {
        y += height;
      } else {
        x += width;
      }
    }
    servicesManager.sectorManager.attachElements(renderElements);
  }

  function rows(
    elements: IComponent[],
    config: Omit<IComponentConfig, "direction">
  ) {
    return layoutDirectional(elements, { ...config, direction: "vert" });
  }

  function columns(
    elements: IComponent[],
    config: Omit<IComponentConfig, "direction">
  ) {
    return layoutDirectional(elements, { ...config, direction: "horyz" });
  }

  return {
    rows, columns
  };
}

export type ILayoutDirectionals = ReturnType<typeof createLayoutDirectionals>