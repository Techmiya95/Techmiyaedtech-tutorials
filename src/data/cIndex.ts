// Re-exports combined C chapters from both parts
import { cChapters as part1 } from "./cContent";
import { cChaptersPart2 as part2 } from "./cContentPart2";
import type { Chapter } from "./javaContent";

export const allCChapters: Chapter[] = [...part1, ...part2];
