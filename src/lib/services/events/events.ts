import { canvas } from "../../canvas";
import { wheelZoom } from "./camera";
import { moveEvents } from "./move";

const SECTOR_SIZE = 150;

const sectors: IEventElement[][][] = [];

function getSector(j: number, i: number) {
  return sectors[i]?.[j];
}
function findInSector(x: number, y: number, sector: IEventElement[]) {
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

function addInSector(j: number, i: number, element: IEventElement) {
  if (!sectors[i]) {
    sectors[i] = [];
  }
  if (!sectors[i][j]) {
    sectors[i][j] = [];
  }
  sectors[i][j].push(element);
}

interface IEventElement {
  x: number;
  y: number;
  width: number;
  height: number;
  click: () => void;
}
export function attachEventListener(element: IEventElement) {
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

function click(x: number, y: number) {
  const sector = getSector(
    Math.floor(x / SECTOR_SIZE),
    Math.floor(y / SECTOR_SIZE)
  );
  if (sector) {
    const el = findInSector(x, y, sector);
    el?.click();
  }
}

export function createAllEvents() {
  canvas.addEventListener("click", (e) => click(e.x, e.y));
  canvas.addEventListener("wheel", wheelZoom);

  moveEvents();
}
