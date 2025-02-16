import type { ICameraControl } from "./cameraControl";

export function createZoomControl(cameraControl: ICameraControl) {
  let startZoom = 0

  function zoom(x: number, y: number, zoom: number) {
    const camera = cameraControl.getCamera()
    const pointerX = (camera.moveX + x) / camera.zoomRatio;
    const pointerY = (camera.moveY + y) / camera.zoomRatio;

    const prevZoomRatio = camera.zoomRatio;

    const zoomRatio = Math.max(zoom, 0.4)
    const moveX = camera.moveX + pointerX * (zoomRatio - prevZoomRatio)
    const moveY = camera.moveY + pointerY * (zoomRatio - prevZoomRatio)
    cameraControl.setCamera({
      moveX,
      moveY,
      zoomRatio,
    })
  }

  function modifyZoom(x: number, y: number, zoomDiff: number) {
    zoom(x, y, zoomDiff + cameraControl.getCamera().zoomRatio)
  }

  function zoomRelativeStartZoom(x: number, y: number, zoomFactor: number) {
    zoom(x, y, startZoom * zoomFactor)
  }

  function initZoom() {
    startZoom = cameraControl.getCamera().zoomRatio
  }

  return {
    modifyZoom, initZoom, zoomRelativeStartZoom
  }
}

export type IZoomControl = ReturnType<typeof createZoomControl>