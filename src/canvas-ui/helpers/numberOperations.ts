export function limitAbsNumber(value: number, limit: number) {
  if (value > limit) return limit;
  if (value < -limit) return -limit;
  return value;
}