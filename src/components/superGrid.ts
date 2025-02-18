import type { IComponentsManager } from "~/components";
import type { IComponent } from "~/types/component";

const GRID_DISTANCE = 50
const X = 2000


export function superGrid(componentsManager: IComponentsManager) {
  const superGrid: IComponent[] = [];
  for (let i = 0; i < GRID_DISTANCE; i++) {
    const columns: IComponent[] = [];
    for (let j = 0; j < GRID_DISTANCE+1; j++) {
      columns.push({
        marginLeft: 25,
        textBlock: {
          background: "purple",
          text: `${i}- ${j}`,
          width: 50 + Math.random() * 60,
          height: 50 + Math.random() * 60,
        }
      });
    }
    superGrid.push({
      marginTop: 25,
      slot: (config) => {
        return componentsManager.molecules.columns(columns, config);
      },
    });
  }

  componentsManager.molecules.rows(superGrid, { x: X });
}
