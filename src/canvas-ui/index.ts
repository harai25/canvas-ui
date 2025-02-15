import { createCanvasManager } from "./canvas";
import { createComponentsManager, type IComponentesManager } from "./components";
import { createServicesManager } from "./services";

export function initCanvasUI(element: HTMLCanvasElement) {
  const canvasManager = createCanvasManager(element)
  const serviceManager = createServicesManager(canvasManager)
  const componentsManager = createComponentsManager(canvasManager, serviceManager)

  return {
    render: (cb: (componentsManager: IComponentesManager) => void) => {
      cb(componentsManager)
      serviceManager.renderManager.render()
      serviceManager.eventsManager.init()
    }
  }
}