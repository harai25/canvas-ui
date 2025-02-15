export const easeOutQuad = (timeFraction: number) =>
  1 - (1 - timeFraction) * (1 - timeFraction);

export function animate(
  timing: (fraction: number) => number,
  draw: (progress: number) => void,
  duration: number,
  signal?: AbortSignal
) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    if (signal?.aborted) {
      return
    }
    
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);
    
    draw(progress); // draw it

    if (timeFraction < 1 && !signal?.aborted) {
      requestAnimationFrame(animate);
    }
  });
}
