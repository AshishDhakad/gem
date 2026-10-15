// THEME OPTIONS. Change THEME below (or set NEXT_PUBLIC_THEME in .env.local): "ivory" | "sage" | "dark"
// ink = page background, panel = cards/sections, pearl = text, gold = accent. Values are R G B.
export const THEMES = {
  ivory: { "--ink": "250 246 239", "--panel": "240 232 220", "--gold": "154 103 14", "--pearl": "45 41 38", "--hero": "linear-gradient(180deg,#FAF6EF 0%,#E4ECE4 60%,#C5D6CB 100%)" },
  sage: { "--ink": "244 248 244", "--panel": "226 236 228", "--gold": "138 98 20", "--pearl": "30 43 36", "--hero": "linear-gradient(180deg,#F4F8F4 0%,#D5E5D9 100%)" },
  dark: { "--ink": "45 41 38", "--panel": "60 55 51", "--gold": "252 197 75", "--pearl": "221 205 187", "--hero": "linear-gradient(180deg,#000 0%,#2b3b31 100%)" },
};
export const THEME = process.env.NEXT_PUBLIC_THEME in THEMES ? process.env.NEXT_PUBLIC_THEME : "ivory";
