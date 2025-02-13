import { text } from "../atoms/text";
import { ctx } from "../canvas";
import { addElementsToRender, type IRenderElement } from "../render/render";
import { attachEventListener } from "../services/events/events";

interface IRowConfig {
  x?: number;
  y?: number;
  color?: string;
}
export interface IRowElement {
  marginLeft?: number;
  marginTop?: number;
  width: number;
  height: number;
  color?: string;
  content?: string;
  background?: string;
  click?: () => void;
}
export const rows = (elements: IRowElement[], config: IRowConfig = {}) => {
  let x = config.x ?? 0;
  let y = config.y ?? 0;

  const renderElements: IRenderElement[] = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    y += element.marginTop ?? 0;
    const width = element.width;
    const height = element.height;
    const currX = x + (element.marginLeft ?? 0)
    const currY = y;
    renderElements.push({
      x,
      y,
      width,
      height,
      render: () => {
        ctx.fillStyle = element.background ?? "black";
        ctx.fillRect(currX, currY, width, height);
        if (element.content) {
          text({
            content: element.content,
            color: element.color,
            x: currX,
            y: currY,
            width,
            fontSize: 24,
          });
          ctx.fillStyle = element.color ?? "black";
        }
        if (element.click) {
          attachEventListener({ x, y, width, height, click: element.click });
        }
      },
    });

    // x+=width
    y += height;
  }

  addElementsToRender(renderElements);
};
