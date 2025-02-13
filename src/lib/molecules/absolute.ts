import { ctx } from "../canvas";
import { addElementsToRender } from "../render/render";

interface IAbsoluteRender {
  x: number,
  y: number;
  width?: number;
  height?: number;
  background?: string;
}
export const renderAbsolute = (params: IAbsoluteRender) => {
  addElementsToRender([{
    x: params.x,
    y: params.y,
    width: params.width ?? 0,
    height: params.height ?? 0,
    render: () => {
      ctx.fillStyle = params.background ?? 'black'
      ctx.fillRect(params.x, params.y, params.width ?? 0, params.height ?? 0);
    }
  }])
}
