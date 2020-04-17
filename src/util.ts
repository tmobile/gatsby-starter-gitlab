export function groupsOf<T>(groupSize: number, from: T[]): T[][] {
  const result: T[][] = [];
  const source: T[] = [...from];
  while (source.length > 0) {
    result.push(source.splice(0, 3));
  }
  return result;
}
