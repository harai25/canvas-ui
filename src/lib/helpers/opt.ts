export const throttle = <T extends (...args: any[]) => any>(
  cb: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) return;
    timeout = setTimeout(() => {
      clearTimeout(timeout!);
      timeout = null
    }, wait);
    cb(...args);
  };
};
