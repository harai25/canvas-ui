import type { IComponentsManager } from "~/components";
import type { IComponent } from "~/types/component";

const GRID_DISTANCE = 100

export function superGrid(componentsManager: IComponentsManager) {
  const superGrid: IComponent[] = [];
  for (let i = 0; i < GRID_DISTANCE; i++) {
    const columns: IComponent[] = [];
    for (let j = 0; j < i+1; j++) {
      columns.push({
        marginLeft: 25,
        textBlock: {
          background: "purple",
          text: `${i}- ${j}`,
          width: 50,
          height: 50,
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

  componentsManager.molecules.rows(superGrid, { x: 1100 });
}
