import type { ICanvasManager } from "~/canvas";
import type { IRenderManager } from "~/services/render";

export interface ICamera {
  moveX: number,
  moveY: number,
  zoomRatio: number,
}

export function createCameraControl(canvasManager: ICanvasManager, renderManager: IRenderManager) {
  const {width, height} = canvasManager.getCanvasSize()
  let prevCamera: ICamera = {
    moveX: 0,
    moveY: 0,
    zoomRatio: 1,
  }
  const camera: ICamera = {
    moveX: 0,
    moveY: 0,
    zoomRatio: 1,
  }

  const setCamera = ({
    moveX = camera.moveX,
    moveY = camera.moveY,
    zoomRatio = camera.zoomRatio
  }: Partial<ICamera>) => {
    prevCamera = {...camera}
    camera.moveX = moveX
    camera.moveY = moveY
    camera.zoomRatio = zoomRatio
    renderManager.render(camera.moveX, camera.moveY, width, height, camera.zoomRatio)
  }

  return {
    getCamera: () => ({...camera}),
    setCamera,
    getPrevCamera: () => ({...prevCamera})
  }
}

export type ICameraControl = ReturnType<typeof createCameraControl>
