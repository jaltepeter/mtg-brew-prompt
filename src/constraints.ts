/** Option with optional Scryfall (or other) search metadata. Use for categories that drive URLs. */
export interface ConstraintOptionWithMeta {
  label: string;
  scryfallId?: string;
  /** Query fragment for Scryfall (e.g. theme); combined with color identity in the app. */
  scryfallQuery?: string;
  /** Rarity filter for Commander search (e.g. "r:common OR r:uncommon"). */
  scryfallRarity?: string;
}

export type ConstraintOption = string | ConstraintOptionWithMeta;

export interface ConstraintCategory {
  label: string;
  options: ConstraintOption[];
}

export type ConstraintsMap = Record<string, ConstraintCategory>;

export const constraints: ConstraintsMap = {
  colorIdentity: {
    label: "Color identity",
    options: [
      { label: "Mono-white", scryfallId: "w" },
      { label: "Mono-blue", scryfallId: "u" },
      { label: "Mono-black", scryfallId: "b" },
      { label: "Mono-red", scryfallId: "r" },
      { label: "Mono-green", scryfallId: "g" },
      { label: "Azorius (WU)", scryfallId: "wu" },
      { label: "Orzhov (WB)", scryfallId: "wb" },
      { label: "Boros (WR)", scryfallId: "wr" },
      { label: "Selesnya (WG)", scryfallId: "wg" },
      { label: "Dimir (UB)", scryfallId: "ub" },
      { label: "Izzet (UR)", scryfallId: "ur" },
      { label: "Simic (UG)", scryfallId: "ug" },
      { label: "Rakdos (BR)", scryfallId: "br" },
      { label: "Golgari (BG)", scryfallId: "bg" },
      { label: "Gruul (RG)", scryfallId: "rg" },
      { label: "Esper (WUB)", scryfallId: "wub" },
      { label: "Grixis (UBR)", scryfallId: "ubr" },
      { label: "Jund (BRG)", scryfallId: "brg" },
      { label: "Naya (WRG)", scryfallId: "wrg" },
      { label: "Bant (WUG)", scryfallId: "wug" },
      { label: "Mardu (WRB)", scryfallId: "wrb" },
      { label: "Temur (URG)", scryfallId: "urg" },
      { label: "Abzan (WBG)", scryfallId: "wbg" },
      { label: "Jeskai (WUR)", scryfallId: "wur" },
      { label: "Sultai (UBG)", scryfallId: "ubg" },
      { label: "Four-color (no green)", scryfallId: "wubr" },
      { label: "Four-color (no red)", scryfallId: "wubg" },
      { label: "Four-color (no black)", scryfallId: "wurg" },
      { label: "Four-color (no white)", scryfallId: "ubrg" },
      { label: "Four-color (no blue)", scryfallId: "wbrg" },
      { label: "Five-color (WUBRG)", scryfallId: "wubrg" },
      { label: "Colorless", scryfallId: "c" },
    ],
  },
  budget: {
    label: "Budget",
    options: [
      "Under $25",
      "Under $50",
      "Under $100",
      "No budget limit",
    ],
  },
  rarity: {
    label: "Rarity",
    options: [
      {
        label: "Commons and uncommons only",
        scryfallRarity: "(r:common OR r:uncommon)",
      },
      { label: "No mythics", scryfallRarity: "-r:mythic" }
    ],
  },
  theme: {
    label: "Theme",
    options: [
      "Tribal",
      "Build around a single card",
      "Mechanic-focused",
      "Jank / surprise",
      "Upgrade a precon",
      { label: "Voltron (commander damage / auras / equip)", scryfallQuery: "t:aura OR t:equipment" },
      { label: "Reanimator / graveyard", scryfallQuery: 'oracle:"from your graveyard"' },
      "Group hug / politics",
      { label: "Lands matter / landfall", scryfallQuery: "keyword:landfall" },
      { label: "Spellslinger (instants and sorceries)", scryfallQuery: "t:instant OR t:sorcery" },
      { label: "Aristocrats (sacrifice and death triggers)", scryfallQuery: "oracle:sacrifice" },
      { label: "Tokens / go wide", scryfallQuery: 'oracle:token' },
      "Control / stax",
      "Combo",
      { label: "Theft / clone (copy or steal opponents' stuff)", scryfallQuery: 'oracle:copy oracle:target' },
      "Pillow fort (defend, alt wincon)",
      { label: "Wheels / discard", scryfallQuery: 'oracle:"draw" oracle:"discard"' },
      { label: "Counters matter (+1/+1, proliferate)", scryfallQuery: "keyword:proliferate" },
      { label: "Enchantments matter (enchantress)", scryfallQuery: "t:enchantment" },
      { label: "Blink / flicker (ETB value)", scryfallQuery: 'oracle:"enters the battlefield"' },
      { label: "Superfriends (planeswalkers)", scryfallQuery: "t:planeswalker" },
      { label: "Mill", scryfallQuery: 'oracle:mill' },
      { label: "Infect / poison", scryfallQuery: "keyword:infect OR keyword:toxic" },
      "Chaos / random (coin flips, dice)",
    ],
  },
  bracket: {
    label: "Bracket",
    options: [
      "Exhibition (ultra-casual; no mass land denial, extra turns, 2-card combos, or game changers; few tutors)",
      "Core (precon-level; no mass land denial, chaining extra turns, 2-card combos, or game changers; few tutors)",
      "Upgraded (above precon; no mass land denial or chaining extra turns; late-game 2-card combos and up to 3 game changers OK)",
      "Optimized (high power, no restrictions beyond banlist)",
      "cEDH (competitive, metagame-focused; no restrictions beyond banlist)",
    ],
  },
};
