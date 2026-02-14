import { cppChapters as part1 } from "./cppContent";
import { cppChaptersPart2 as part2 } from "./cppContentPart2";
import { cppChaptersPart3 as part3 } from "./cppContentPart3";
import type { Chapter } from "./javaContent";

export const allCppChapters: Chapter[] = [...part1, ...part2, ...part3];
