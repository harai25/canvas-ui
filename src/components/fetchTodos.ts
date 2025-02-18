import type { IComponentsManager } from "~/components";
import type { IComponent } from "~/types/component";

const X = 1000
const Y = 100
interface ITodo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export async function fetchTodos(componentsManager: IComponentsManager) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const json: ITodo[] = await response.json()


  const components: IComponent[] = json.map(e => ({
    marginTop: 20,
    textBlock: {
      background: e.completed ? 'lightgreen' : 'orange',
      text: `${e.userId} - ${e.title}`,
      width: 300,
      height: 100,
    }
  }))

  componentsManager.molecules.rows(components, { x: X, y: Y });
}
