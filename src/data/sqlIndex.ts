import { sqlChapters as part1 } from "./sqlContent";
import { sqlChaptersPart2 as part2 } from "./sqlContentPart2";
import type { Chapter } from "./javaContent";

export const allSqlChapters: Chapter[] = [...part1, ...part2];
