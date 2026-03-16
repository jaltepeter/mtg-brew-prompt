import {
  constraints,
  type ConstraintOption,
  type ConstraintsMap,
} from "./constraints";

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getOptionLabel(option: ConstraintOption): string {
  return typeof option === "string" ? option : option.label;
}

const SCRYFALL_BASE = "https://scryfall.com/search";

function buildScryfallThemeUrl(
  colorScryfallId: string,
  themeQuery: string,
  rarityFragment?: string
): string {
  const parts = [
    `(commander:${colorScryfallId})`,
    `(${themeQuery})`,
  ];
  if (rarityFragment) parts.push(`(${rarityFragment})`);
  const q = parts.join(" AND ");
  return `${SCRYFALL_BASE}?q=${encodeURIComponent(q)}`;
}

function getScryfallQuery(option: ConstraintOption): string | undefined {
  return typeof option === "string" ? undefined : option.scryfallQuery;
}

function getScryfallRarityFragment(option: ConstraintOption): string | undefined {
  return typeof option === "string" ? undefined : option.scryfallRarity;
}

function buildScryfallLegendaryUrl(
  scryfallId: string,
  rarityFragment?: string
): string {
  let q = `t:legendary t:creature id=${scryfallId}`;
  if (rarityFragment) q += ` ${rarityFragment}`;
  return `${SCRYFALL_BASE}?q=${encodeURIComponent(q)}`;
}

export interface GeneratedPrompt {
  heading: string;
  items: string[];
  scryfallLegendaryUrl: string;
  /** Present when theme was selected and has a Scryfall query. */
  scryfallThemeUrl: string | null;
}

/**
 * Always picks a color identity for the heading, then picks 2–3 other
 * categories for the list. Returns a structured prompt for list display.
 */
export function generatePrompt(
  constraintsObj: ConstraintsMap = constraints,
  numCategories?: number
): GeneratedPrompt {
  const colorOption = pickRandom(constraintsObj.colorIdentity.options);
  const colorLabel = getOptionLabel(colorOption);
  const colorScryfallId =
    typeof colorOption === "string" ? "wubrg" : colorOption.scryfallId ?? "wubrg";
  const heading = `Build a ${colorLabel} Commander deck`;

  const otherKeys = Object.keys(constraintsObj).filter((k) => k !== "colorIdentity");
  const count =
    numCategories != null
      ? Math.min(Math.max(2, numCategories), otherKeys.length)
      : 2 + Math.floor(Math.random() * Math.min(2, Math.max(0, otherKeys.length - 2)));
  const shuffled = [...otherKeys].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  let selectedThemeOption: ConstraintOption | null = null;
  let selectedRarityOption: ConstraintOption | null = null;
  const items = selected.map((key) => {
    const cat = constraintsObj[key];
    const option = pickRandom(cat.options);
    if (key === "theme") selectedThemeOption = option;
    if (key === "rarity") selectedRarityOption = option;
    return `${cat.label}: ${getOptionLabel(option)}`;
  });

  const rarityFragment = selectedRarityOption
    ? getScryfallRarityFragment(selectedRarityOption)
    : undefined;

  const themeQuery = selectedThemeOption ? getScryfallQuery(selectedThemeOption) : undefined;
  const scryfallThemeUrl =
    themeQuery
      ? buildScryfallThemeUrl(colorScryfallId, themeQuery, rarityFragment)
      : null;

  const scryfallLegendaryUrl = buildScryfallLegendaryUrl(
    colorScryfallId,
    rarityFragment
  );

  return {
    heading,
    items,
    scryfallLegendaryUrl,
    scryfallThemeUrl,
  };
}
