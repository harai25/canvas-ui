import type { IRowElement } from "~/components/molecules/rows";
import { initCanvasUI } from "./canvas-ui";
import "./styles/main.css";

// const count = 2000000
const count = 2000

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


initCanvasUI(document.getElementById('canvas') as HTMLCanvasElement).render(componentsManager => {
  componentsManager.molecules.rows(elems);

  componentsManager.molecules.rows(elems2, { x: 500 });

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
