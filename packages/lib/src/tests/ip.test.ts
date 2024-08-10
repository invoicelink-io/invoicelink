import { expect, describe, it } from "vitest";
import { generateIPRange } from "../utils/ip";

describe("generateIPRange", () => {
  it("should generate the correct IP range", () => {
    const start = "192.168.0.1";
    const end = "192.168.0.5";
    const expected = [
      "192.168.0.1",
      "192.168.0.2",
      "192.168.0.3",
      "192.168.0.4",
      "192.168.0.5",
    ];
    const result = generateIPRange(start, end);
    expect(result).toEqual(expected);
  });

  it("should handle different IP ranges", () => {
    const start = "10.0.0.1";
    const end = "10.0.0.3";
    const expected = ["10.0.0.1", "10.0.0.2", "10.0.0.3"];
    const result = generateIPRange(start, end);
    expect(result).toEqual(expected);
  });

  // Add more test cases if needed
});
