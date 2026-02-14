import { djangoChapters as part1 } from "./djangoContent";
import { djangoChaptersPart2 as part2 } from "./djangoContentPart2";
import type { Chapter } from "./javaContent";

export const allDjangoChapters: Chapter[] = [...part1, ...part2];
