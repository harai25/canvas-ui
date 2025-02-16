export const throttle = <T extends (...args: any[]) => any>(
  cb: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) return;
    timeout = setTimeout(() => {
      clearTimeout(timeout!);
      timeout = null
    }, wait);
    cb(...args);
  };
};

const DEFAULT_CHUNK_SIZE = 10000
interface IProcessChunkFor {
  start?: number,
  end: number,
  cb: (i: number) => void,
  cbOnChunkEnd?: () => void,
  chunkSize?: number,
  timeout?: number,
}
// export const processChunkFor = ({
//   start = 0,
//   end,
//   cb,
//   cbOnChunkEnd,
//   chunkSize = DEFAULT_CHUNK_SIZE,
//   timeout = 10
// }: IProcessChunkFor) => {
//   console.log(1)
//   const currentEnd = Math.min(end, start + chunkSize)
//   for (let i = start; i<currentEnd; i++) {
//     cb(i)
//   }
//   cbOnChunkEnd?.()
//   if (currentEnd < end) {
//     setTimeout(() => {
//       processChunkFor({
//         start: currentEnd,
//         end,
//         cb,
//         cbOnChunkEnd,
//         chunkSize,
//         timeout
//       })
//     }, timeout)
//   }
// }