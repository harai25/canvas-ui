export interface ISectorElement {
  x: number;
  y: number;
  width: number;
  height: number;
  render: () => void;
}
const SECTOR_SIZE = 1000;

export function createSectorsManager() {
  const sectors: ISectorElement[][][] = [];

  function getSector(j: number, i: number) {
    return sectors[i]?.[j];
  }

  function addInSector(j: number, i: number, element: ISectorElement) {
    if (!sectors[i]) {
      sectors[i] = [];
    }
    if (!sectors[i][j]) {
      sectors[i][j] = [];
    }
    sectors[i][j].push(element);
  }

  function attachElement(element: ISectorElement) {
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

  function attachElements(objects: ISectorElement[]) {
    objects.forEach(attachElement)
    // processChunkFor({
    //   end: objects.length,
    //   cb: (i) => {
    //     attachElement(objects[i])
    //   },
    //   // timeout: 300
    // })
    // attachChunkElements(objects, 0)
  }

  return {
    attachElement, attachElements, getSector, SECTOR_SIZE
  }
}

export type ISectorManager = ReturnType<typeof createSectorsManager>
