import { describe, it, expect, vi } from "vitest";
import { generatePrompt } from "./generatePrompt";
import type { ConstraintsMap } from "./constraints";

describe("generatePrompt", () => {
  it("returns object with heading, items, scryfallLegendaryUrl, scryfallThemeUrl", () => {
    const result = generatePrompt();
    expect(result).toHaveProperty("heading");
    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("scryfallLegendaryUrl");
    expect(result).toHaveProperty("scryfallThemeUrl");
    expect(typeof result.heading).toBe("string");
    expect(Array.isArray(result.items)).toBe(true);
    expect(typeof result.scryfallLegendaryUrl).toBe("string");
    expect(result.scryfallThemeUrl === null || typeof result.scryfallThemeUrl === "string").toBe(
      true
    );
  });

  it("heading starts with 'Build a' and ends with 'Commander deck'", () => {
    const result = generatePrompt();
    expect(result.heading.startsWith("Build a ")).toBe(true);
    expect(result.heading.endsWith(" Commander deck")).toBe(true);
  });

  it("items has between 2 and 3 entries", () => {
    const result = generatePrompt();
    expect(result.items.length).toBeGreaterThanOrEqual(2);
    expect(result.items.length).toBeLessThanOrEqual(3);
  });

  it("each item is a string with format 'Label: value'", () => {
    const result = generatePrompt();
    for (const item of result.items) {
      expect(typeof item).toBe("string");
      expect(item).toContain(":");
      expect(item.length).toBeGreaterThan(2);
    }
  });

  it("scryfallLegendaryUrl points to Scryfall and includes legendary creature query", () => {
    const result = generatePrompt();
    expect(result.scryfallLegendaryUrl).toContain("scryfall.com");
    expect(result.scryfallLegendaryUrl).toContain("search");
    expect(decodeURIComponent(result.scryfallLegendaryUrl)).toMatch(/t:legendary\s+t:creature/);
  });

  it("with minimal constraints (single option per category), heading and URL use that color", () => {
    const minimal: ConstraintsMap = {
      colorIdentity: {
        label: "Color identity",
        options: [{ label: "Mono-white", scryfallId: "w" }],
      },
      budget: { label: "Budget", options: ["Under $25"] },
      rarity: { label: "Rarity", options: ["Any"] },
      theme: { label: "Theme", options: ["Tribal"] },
      bracket: { label: "Bracket", options: ["Casual"] },
    };

    vi.spyOn(Math, "random").mockReturnValue(0);

    const result = generatePrompt(minimal, 2);

    expect(result.heading).toBe("Build a Mono-white Commander deck");
    expect(result.items).toHaveLength(2);
    const decodedLegendary = decodeURIComponent(result.scryfallLegendaryUrl);
    expect(decodedLegendary).toContain("id=w");
    expect(decodedLegendary).toMatch(/t:legendary\s+t:creature/);

    vi.restoreAllMocks();
  });

  it("respects numCategories when provided", () => {
    const minimal: ConstraintsMap = {
      colorIdentity: {
        label: "Color identity",
        options: [{ label: "Mono-green", scryfallId: "g" }],
      },
      budget: { label: "Budget", options: ["$50"] },
      rarity: { label: "Rarity", options: ["Any"] },
      theme: { label: "Theme", options: ["Tribal"] },
      bracket: { label: "Bracket", options: ["Casual"] },
    };

    const result = generatePrompt(minimal, 2);
    expect(result.items).toHaveLength(2);

    const resultThree = generatePrompt(minimal, 3);
    expect(resultThree.items).toHaveLength(3);
  });
});
