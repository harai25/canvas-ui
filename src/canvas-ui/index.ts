import { createCanvasManager } from "./canvas";
import { createComponentsManager, type IComponentsManager } from "./components";
import { createServicesManager } from "./services";

export function initCanvasUI(element: HTMLCanvasElement) {
  const canvasManager = createCanvasManager(element)
  const serviceManager = createServicesManager(canvasManager)
  const componentsManager = createComponentsManager(canvasManager, serviceManager)

  return {
    render: (cb: (componentsManager: IComponentsManager) => void) => {
      cb(componentsManager)
      serviceManager.renderManager.firstRender()
      serviceManager.eventsManager.init()
    }
  }
}