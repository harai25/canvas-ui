import { canvas } from "../../canvas";
import { animate, easeOutQuad } from "../../helpers/animation";
import { createScroll } from "./camera";

const RUN_MULTIPLY = 2

let timeout: number | null = null;

let xDown = 0;
let yDown = 0;

let lastMoveX = 0;
let lastMoveY = 0;
let preLastMoveX = 0;
let preLastMoveY = 0;
let scroll: ReturnType<typeof createScroll> = () => {};

let controller: AbortController | null = null;

function pointermove(e: { x: number; y: number }) {
  preLastMoveX = lastMoveX;
  preLastMoveY = lastMoveY;
  lastMoveX = e.x - xDown;
  lastMoveY = e.y - yDown;
  scroll(lastMoveX, lastMoveY);
}

function pointerup() {
  controller = new AbortController();
  animate(
    easeOutQuad,
    (progress) => {
      const x = lastMoveX + (lastMoveX - preLastMoveX) * RUN_MULTIPLY * progress
      const y = lastMoveY + (lastMoveY - preLastMoveY) * RUN_MULTIPLY * progress
      scroll(x, y);
    },
    300,
    controller.signal
  );
  if (timeout) {
    clearTimeout(timeout);
  }
}

function pointerdown(x: number, y: number) {
  controller?.abort();
  xDown = x;
  yDown = y;
  scroll = createScroll();
}

function desktopEvents() {
  canvas.addEventListener("mousedown", e => {
    pointerdown(e.x, e.y)
    timeout = setTimeout(() => {
      canvas.addEventListener("mousemove", pointermove);
    }, 50);
  });
  canvas.addEventListener("mouseup", () => {
    pointerup()
    canvas.removeEventListener("mousemove", pointermove);
  });
}
function mobileEvents() {
  canvas.addEventListener("touchmove", (e) => {
    pointermove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  });
  canvas.addEventListener("touchstart", (e) => {
    pointerdown(e.touches[0].clientX, e.touches[0].clientY)
  });
  canvas.addEventListener("touchend", pointerup);
}
export function moveEvents() {
  desktopEvents()
  mobileEvents()
}