export function generateIPRange(start: string, end: string): string[] {
  const startParts = start.split(".").map(Number);
  const endParts = end.split(".").map(Number);
  const ipList: string[] = [];

  for (let i = startParts[3]; i <= endParts[3]; i++) {
    ipList.push(`${startParts[0]}.${startParts[1]}.${startParts[2]}.${i}`);
  }

  return ipList;
}
