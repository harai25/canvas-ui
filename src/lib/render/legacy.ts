import { canvas, ctx } from "../canvas";
import { manyBinarySearch, mergeSortedTree } from "../helpers/arrayMethods";

export interface IRenderElement {
  x: number;
  y: number;
  width: number;
  height: number;
  render: () => void;
}

let yTopPointTree: IRenderElement[] = [];
let yBottomPointTree: IRenderElement[] = [];

function renderTree(x: number, y: number, width: number, height: number) {
  manyBinarySearch(yTopPointTree, el => {
    if (el.y >= y && el.y <= y+height) {
      return 0
    }
    return el.y - y
  }, el => el.render())
  manyBinarySearch(yBottomPointTree, el => {
    const bottomPoint = el.y + el.height
    if (bottomPoint <= y + height && bottomPoint >= y) {
      return 0
    }
    return bottomPoint - y + height
  }, el => el.render())
}

function addElementsToRender(objects: IRenderElement[]) {
  const yTopCurrent = objects.sort((a, b) => a.y - b.y);
  const yBottomCurrent = objects.sort((a, b) => a.y + a.height - b.y - b.height);
  yTopPointTree = mergeSortedTree(yTopCurrent, yTopPointTree, (a, b) => a.y > b.y)
  yBottomPointTree = mergeSortedTree(yBottomCurrent, yBottomPointTree, (a, b) => a.y + a.height > b.y - b.height)
}

function render(
  x = 0,
  y = 0,
  width = window.innerWidth,
  height = window.innerHeight
) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, -x, -y);
  renderTree(x, y, width, height);
}
