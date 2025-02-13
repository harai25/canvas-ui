// let contentWidth = window.innerWidth
// let contentHeight = window.innerHeight

import { createAllEvents } from "./services/events/events";

// function resizeCanvas() {
//   console.log(contentWidth, contentHeight)
//   const imageData = ctx?.getImageData(0, 0, contentWidth, contentHeight)
//   // setCanvasSize()
//   if (imageData) ctx?.putImageData(imageData, 0, 0)
// }

// window.addEventListener('resize', resizeCanvas)

function setCanvasSize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createAllEvents()
  // ctx.tr
}

export const canvas = document.getElementById('canvas') as HTMLCanvasElement
if (!canvas) {
  throw new Error('Нет канвас')
}
const context = canvas.getContext('2d');
if (!context) {
  throw new Error('Нет 2d')
}
setCanvasSize(canvas, context)
export const ctx = context
context.textBaseline = "top"
