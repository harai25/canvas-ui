import type { ICanvasManager } from '~/canvas'
import type { IMoveControl } from './move'
import type { IZoomControl } from './zoom'

const TWO_FINGERS_UP_CHECK_TIMEOUT = 300

export function initMobileEvents(canvasManager: ICanvasManager, moveControl: IMoveControl, zoomControl: IZoomControl) {
  let startFingersDistance = 0

  function getFingersDistance(event: TouchEvent) {
    const x = Math.abs(event.touches[0].clientX - event.touches[1].clientX)
    const y = Math.abs(event.touches[0].clientY - event.touches[1].clientY)
    return Math.sqrt(x * x + y * y)
  }

  function getFingersCenter(e: TouchEvent): [number, number] {
    return [(e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2]
  }

  let isTwoFingers = false
  let isOneFingerAfterTwoFingers = false

  canvasManager.eventsMethods.addEvent('touchmove', e => {
    e.preventDefault()
    if (e.touches.length === 1) {
      moveControl.move(e.touches[0].clientX, e.touches[0].clientY)
    }

    if (e.touches.length === 2) {
      const currentFingersDistance = getFingersDistance(e)
      zoomControl.zoomRelativeStartZoom(...getFingersCenter(e), currentFingersDistance / startFingersDistance)

      const center = getFingersCenter(e)
      moveControl.move(center[0], center[1])
    }
  })
  canvasManager.eventsMethods.addEvent('touchstart', e => {
    isOneFingerAfterTwoFingers = false
    if (e.touches.length === 1) {
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY)
    }

    if (e.touches.length === 2) {
      isTwoFingers = true
      zoomControl.initZoom()
      startFingersDistance = getFingersDistance(e)

      moveControl.pointerdown(...getFingersCenter(e))
    }
  })
  canvasManager.eventsMethods.addEvent('touchend', e => {
    if (e.touches.length === 1) {
      if (isTwoFingers) {
        isOneFingerAfterTwoFingers = true
        setTimeout(() => {
          isOneFingerAfterTwoFingers = false
        }, TWO_FINGERS_UP_CHECK_TIMEOUT)
      }

      moveControl.stopActiveMove()
      moveControl.pointerdown(e.touches[0].clientX, e.touches[0].clientY)
    }
    if (!e.touches.length) {
      if (isOneFingerAfterTwoFingers) {
        moveControl.stopActiveMove()
      } else {
        moveControl.pointerup()
      }
    }
  })
}
