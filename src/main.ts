import type { IComponent } from "~/types/component";
import { initCanvasUI } from "./canvas-ui";
import "./styles/main.css";
import { superGrid } from "./components/superGrid";
import { fetchTodos } from "./components/fetchTodos";

const count = 4000
// const count = 2000000

const elems: IComponent[] = [];
for (let i = 0; i < count / 2; i++) {
  elems.push({
    marginTop: 10,
    marginLeft: 10,
    textBlock: {
      background: `rgb(${(i * 20) % 255}, ${(i * 20) % 255}, 255)`,
      text: `${i * 10 + 21} очеееееень длиннннннныыыыый теееееееееекст`,
      width: 250,
      height: 100,
    },
    click: () => console.log(i),
  });
}
const elems2: IComponent[] = [];
for (let i = 0; i < count; i++) {
  elems2.push({
    marginTop: 25,
    marginLeft: 10,
    textBlock: {
      background: "yellow",
      text: `${i}. testestests estest testestset esteststse`,
      width: 500,
      height: 50 + + Math.random() * 70,
    },
    click: () => console.log(i),
  });
}

const elems3: IComponent[] = []
for (let i = 0; i < count; i++) {
  elems3.push({
    marginTop: 25,
    marginLeft: 10,
    textBlock: {
      background: "green",
      text: `${i * 2}. i am in row`,
      width: 100 + Math.random() * 100,
      height: 200,
    },
    click: () => console.log(i, 'elems3'),
  });
}


initCanvasUI(document.getElementById('canvas') as HTMLCanvasElement).render(componentsManager => {
  componentsManager.molecules.rows(elems);

  componentsManager.molecules.rows(elems2, { x: 500 });

  componentsManager.molecules.columns(elems3, { y: -300 })

  superGrid(componentsManager)

  fetchTodos(componentsManager)

  componentsManager.molecules.absolute({
    x: 700,
    y: 150,
    width: 100,
    height: 100,
    background: "green",
  });

  componentsManager.molecules.absolute({
    x: -100,
    y: -100,
    width: 100,
    height: 100,
    background: "red",
  });
})
