import { type ICanvasManager } from '~/canvas'
import type { IAtoms } from '../atoms'
import type { IServicesManager } from '~/services'
import type { ISectorElement } from '~/services/sectors'
import type { IComponent, IComponentConfig, IConfig, IReturnComponent, ITextBlock } from '~/types/component'

export function createLayoutDirectionals(
  canvasManager: ICanvasManager,
  servicesManager: IServicesManager,
  atoms: IAtoms,
) {
  function renderTextBlock(
    textBlock: ITextBlock,
    x: number,
    y: number,
    currX: number,
    currY: number,
    click: IComponent['click'],
  ): ISectorElement {
    return {x, y, width: textBlock.width, height: textBlock.height, events: {click},
      render: () => {
        canvasManager.rectangleMethods.drawRectangle({
          x: currX,
          y: currY,
          width: textBlock.width,
          height: textBlock.height,
          background: textBlock.background ?? 'black',
        })
        if (textBlock.text) {
          atoms.text({
            content: textBlock.text,
            color: textBlock.color,
            x: currX,
            y: currY,
            width: textBlock.width,
            fontSize: 24,
          })
        }
      },
    }
  }

  function layoutDirectional(elements: IComponent[], config: IComponentConfig): IReturnComponent {
    let x = config.x ?? 0
    let y = config.y ?? 0
    let minWidth = 0
    let minHeight = 0
    const renderElements: ISectorElement[] = []
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]

      let elementX = x
      let elementY = y
      if (config.direction === 'vert') {
        y += element.marginTop ?? 0
        elementX = x + (element.marginLeft ?? 0)
      } else {
        x += element.marginLeft ?? 0
        elementY = y + (element.marginTop ?? 0)
      }
      let width = 0
      let height = 0

      if ('textBlock' in element) {
        renderElements.push(renderTextBlock(element.textBlock, x, y, elementX, elementY, element.click))
        width = element.textBlock.width
        height = element.textBlock.height
      } else {
        const slotComponent = element.slot({x, y})
        width = slotComponent.width
        height = slotComponent.height
      }

      if (config.direction === 'vert') {
        if (width > minWidth) {
          minWidth = width
        }
        y += height
      } else {
        if (height > minHeight) {
          minHeight = height
        }
        x += width
      }
    }
    servicesManager.sectorManager.attachElements(renderElements)
    return {
      width: Math.max(x - (config.x ?? 0), minWidth),
      height: Math.max(y - (config.y ?? 0), minHeight),
    }
  }

  function rows(elements: IComponent[], config?: IConfig) {
    return layoutDirectional(elements, { ...config, direction: 'vert' })
  }

  function columns(elements: IComponent[], config?: IConfig) {
    return layoutDirectional(elements, { ...config, direction: 'horyz' })
  }

  return {
    rows,
    columns,
  }
}

export type ILayoutDirectionals = ReturnType<typeof createLayoutDirectionals>
