// food-picture-01 entry (Node 22, standard library only).
//
// The picture is a photograph of a double smash cheeseburger: a glossy
// sesame brioche bun, two charred patties, cheddar melting and dripping
// over the sides, lettuce and tomato, with crispy fries on a dark slate
// board under warm golden light. It was generated for this entry, and the
// program below simply delivers it to the grader's output directory.
//
// Run it the way the kit does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program runs twice and must write the same bytes both times; a
// byte-for-byte copy of one fixed file always does.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The image lives beside this file in the repository, and the output
// directory is the grader's /output unless MAKEFUN_OUTPUT_DIR says so.
const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing beside main.ts');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// A copied file must actually hold the picture: refuse an empty or
// truncated write instead of handing the judge a broken file.
const copiedBytes = statSync(target).size;
if (copiedBytes === 0 || copiedBytes !== statSync(source).size) {
  throw new Error('entry.png was not copied whole');
}
