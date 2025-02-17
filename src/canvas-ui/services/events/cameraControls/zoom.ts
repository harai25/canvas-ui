import type { ICameraControl } from "./cameraControl";

export function createZoomControl(cameraControl: ICameraControl) {
  let startZoomRatio = 0

  function zoom(x: number, y: number, zoom: number) {
    const [pointerX, pointerY] = cameraControl.getPointerCoord(x, y)

    const camera = cameraControl.getCamera()
    
    const prevZoomRatio = camera.zoomRatio;
    const zoomRatio = Math.max(zoom, 0.4)

    const diffMoveX = pointerX * (zoomRatio - prevZoomRatio)
    const diffMoveY = pointerY * (zoomRatio - prevZoomRatio)

    cameraControl.cameraAdditionalInfo.moveXOnStartMove += diffMoveX
    cameraControl.cameraAdditionalInfo.moveYOnStartMove += diffMoveY
    const moveX = camera.moveX + diffMoveX
    const moveY = camera.moveY + diffMoveY
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
    zoom(x, y, startZoomRatio * zoomFactor)
  }

  function initZoom() {
    startZoomRatio = cameraControl.getCamera().zoomRatio
  }

  return {
    modifyZoom, initZoom, zoomRelativeStartZoom
  }
}

export type IZoomControl = ReturnType<typeof createZoomControl>