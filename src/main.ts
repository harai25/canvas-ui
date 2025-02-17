import type { IRowElement } from "~/components/molecules/rows";
import { initCanvasUI } from "./canvas-ui";
import "./styles/main.css";
import type { IColumnElement } from "~/components/molecules/columns";

const count = 100
// const count = 2000000

let elems: IRowElement[] = [];
for (let i = 0; i < count / 2; i++) {
  elems.push({
    marginTop: 10,
    marginLeft: 10,
    background: `rgb(${(i * 20) % 255}, ${(i * 20) % 255}, 255)`,
    content: `${i * 10 + 21} очеееееень длиннннннныыыыый теееееееееекст`,
    width: 250,
    height: 100,
    click: () => console.log(i),
  });
}
let elems2: IRowElement[] = [];
for (let i = 0; i < count; i++) {
  elems2.push({
    marginTop: 25,
    marginLeft: 10,
    background: "yellow",
    content: `${i}. testestests estest testestset esteststse`,
    width: 500,
    height: 50,
    click: () => console.log(i),
  });
}

let elems3: IColumnElement[] = []
for (let i = 0; i < count; i++) {
  elems3.push({
    marginTop: 25,
    marginLeft: 10,
    background: "green",
    content: `${i * 2}. i am in row`,
    width: 100,
    height: 200,
    click: () => console.log(i, 'elems3'),
  });
}


initCanvasUI(document.getElementById('canvas') as HTMLCanvasElement).render(componentsManager => {
  componentsManager.molecules.rows(elems);

  componentsManager.molecules.rows(elems2, { x: 500 });

  componentsManager.molecules.columns(elems3, { y: -300 })

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
