import { describe, it, expect } from "vitest";
import { constraints } from "./constraints";

describe("constraints", () => {
  it("has required categories", () => {
    expect(constraints).toHaveProperty("colorIdentity");
    expect(constraints).toHaveProperty("budget");
    expect(constraints).toHaveProperty("rarity");
    expect(constraints).toHaveProperty("theme");
    expect(constraints).toHaveProperty("bracket");
  });

  it("each category has label and options array", () => {
    for (const [key, category] of Object.entries(constraints)) {
      expect(category.label).toBeDefined();
      expect(typeof category.label).toBe("string");
      expect(Array.isArray(category.options)).toBe(true);
      expect(category.options.length).toBeGreaterThan(0);
    }
  });

  it("colorIdentity options have label and scryfallId", () => {
    for (const option of constraints.colorIdentity.options) {
      if (typeof option === "string") {
        expect(option).toBeTruthy();
      } else {
        expect(option.label).toBeDefined();
        expect(option.scryfallId).toBeDefined();
        expect(typeof option.scryfallId).toBe("string");
      }
    }
  });

  it("theme options that are objects have label", () => {
    for (const option of constraints.theme.options) {
      if (typeof option !== "string") {
        expect(option.label).toBeDefined();
        expect(typeof option.label).toBe("string");
      }
    }
  });

  it("rarity has at least one option with scryfallRarity for Commander filter", () => {
    const withRarity = constraints.rarity.options.filter(
      (o) => typeof o !== "string" && "scryfallRarity" in o
    );
    expect(withRarity.length).toBeGreaterThanOrEqual(1);
  });
});
