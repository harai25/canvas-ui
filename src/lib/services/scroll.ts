import { canvas, ctx } from "../canvas"
import { draw } from "../render/render"

const SCROLL_RATIO = 0.15

let scrollX = 0
let scrollY = 0

export function createScroll() {
  let createX = scrollX
  let createY = scrollY
  return (x: number, y: number) => {
    scrollX = createX - x
    scrollY = createY - y
    requestAnimationFrame(() => {
      draw(scrollX, scrollY, canvas.width, canvas.height)
    })
  }
}


export function updateScroll(deltaX: number, deltaY: number) {
  requestAnimationFrame(() => {
    scrollX+= deltaX * SCROLL_RATIO
    scrollY+= deltaY * SCROLL_RATIO
    draw(scrollX, scrollY, canvas.width, canvas.height)
  })
}