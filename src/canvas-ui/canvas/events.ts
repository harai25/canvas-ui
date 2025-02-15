export function createEventsMethods(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas
  const events = {
    mousedown: [] as ((e: MouseEvent) => void)[],
    mouseup: [] as ((e: MouseEvent) => void)[],
    mousemove: [] as ((e: MouseEvent) => void)[],
    touchmove: [] as ((e: TouchEvent) => void)[],
    touchstart: [] as ((e: TouchEvent) => void)[],
    touchend: [] as ((e: TouchEvent) => void)[],
    click: [] as ((e: MouseEvent) => void)[],
    wheel: [] as ((e: WheelEvent) => void)[]
  };
  for (let key in events) {
    const keyTyped = key as keyof typeof events
    canvas.addEventListener(keyTyped, (event: any) => {
      events[keyTyped].forEach(element => element(event))
    })
  }

  function addEvent<K extends keyof typeof events>(name: K, event: (typeof events)[K][number]) {
    events[name].push(event as any)
    return () => {
      events[name] = events[name].filter(e => e!==event) as any
    }
  }

  return {
    addEvent
  }
}
