import "./styles/main.css";
import { rows, type IRowElement } from "./lib/molecules/rows";
import { renderAbsolute } from "./lib/molecules/absolute";
import { draw } from "./lib/render/render";



let elems: IRowElement[] = [];
for (let i = 0; i < 5000000; i++) {
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
rows(elems);

let elems2: IRowElement[] = [];
for (let i = 0; i < 1000000; i++) {
  elems2.push({
    marginTop: 25,
    marginLeft: 10,
    background: 'yellow',
    content: `${i}. testestests estest testestset esteststse`,
    width: 500,
    height: 50,
    click: () => console.log(i),
  });
}
rows(elems2, {x: 500});


renderAbsolute({
  x: 700,
  y: 150,
  width: 100,
  height: 100,
  background: "green",
});


draw()