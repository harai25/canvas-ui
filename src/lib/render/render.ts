import { canvas, ctx } from "../canvas";
import { throttle } from "../helpers/opt";

export interface IRenderElement {
  x: number;
  y: number;
  width: number;
  height: number;
  render: () => void;
}
const SECTOR_SIZE = 150;

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

export function attachElement(element: IRenderElement) {
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

export function addElementsToRender(objects: IRenderElement[]) {
  objects.forEach(attachElement)
}

function render(x: number, y: number, width: number, height: number) {
  const ax = Math.floor(x / SECTOR_SIZE)
  const ay = Math.floor(y / SECTOR_SIZE)
  const bx = Math.floor((x + width) / SECTOR_SIZE)
  const by = Math.floor((y + height) / SECTOR_SIZE)
  for (let i = ax; i <= bx; i++) {
    for (let j = ay; j <=by; j++) {
      const sector = getSector(i, j)
      if (sector) {
        sector.forEach(e => {e.render()})
      }
    }
  }
}

export const throttleDraw = throttle(draw, 0)

export function draw(
  x = 0,
  y = 0,
  width = window.innerWidth,
  height = window.innerHeight
) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, -x, -y);
  render(x, y, width, height);
}
