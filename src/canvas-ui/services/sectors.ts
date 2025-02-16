export interface IRenderElement {
  x: number;
  y: number;
  width: number;
  height: number;
  render: () => void;
}
const SECTOR_SIZE = 500;
const CHUNK_SIZE = 100000

export function createSectorsManager() {
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

  function attachChunkElements(objects: IRenderElement[], start: number) {
    const end = Math.min(objects.length, start + CHUNK_SIZE)
    for (let i = start; i<Math.min(objects.length, start + CHUNK_SIZE); i++) {
      attachElement(objects[i])
    }

    if (end !== objects.length) {
      setTimeout(() => {
        console.log('chunked')
        attachChunkElements(objects, end)
      }, 300)
    }
  }

  function attachElements(objects: IRenderElement[]) {
    attachChunkElements(objects, 0)
  }

  return {
    attachElement, attachElements, getSector, SECTOR_SIZE
  }
}

export type ISectorManager = ReturnType<typeof createSectorsManager>
