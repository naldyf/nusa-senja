// Entry for make.fun the-poster-for-a-place-that-i-2-20261121-0539:
// "The Poster for a Place That Isn't There".
//
// The image (entry.png) is a travel poster for NUSA SENJA, an island that
// does not exist — a golden-sunset Indonesian beach with a candi bentar
// (split temple gate) sea stack as its signature landmark, a jukung
// (outrigger canoe) on a turquoise sea, and the place name set in bold
// type. Drawn as HTML/SVG (page.html) and rendered to entry.png at
// 1024x1024 with headless Chromium (render.mjs). This program's only job
// is to place that exact image at /output/entry.png. It reads the file
// and writes it back byte for byte, so two runs produce identical output,
// and it never touches the network.
//
// Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(join(here, 'entry.png'));

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
console.log(`wrote entry.png (${image.length} bytes) to ${outDir}`);
