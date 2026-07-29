import type { NextConfig } from "next";

import { landingPages } from "./src/data/landingPages";
import {
  formatIssues,
  maxPairwiseSimilarity,
  THRESHOLDS,
  validateLandingPages,
} from "./src/data/landingPages/validate";

/**
 * THE QUALITY GATE RUNS HERE.
 *
 * Deliberately in next.config.ts rather than a `prebuild` npm script:
 *   • it uses Next's own module resolution, so path aliases and extensionless
 *     imports resolve exactly as they do in app code
 *   • it runs identically under npm, pnpm and bun
 *   • it needs no extra dev dependency (tsx / ts-node) that could be missing on
 *     the deploy runner
 *
 * It throws. That is the point — a failing build cannot be ignored the way a
 * lint warning can. See src/data/landingPages/validate.ts for the thresholds,
 * and do not lower one to make a page pass.
 */
const gateIssues = validateLandingPages(landingPages);

if (gateIssues.length) {
  throw new Error(
    `\n✗ Landing page quality gate failed (${gateIssues.length} issue${gateIssues.length === 1 ? "" : "s"}):\n` +
      `${formatIssues(gateIssues)}\n\n` +
      `  Fix the page, do not lower the threshold.\n`,
  );
}

console.log(
  `✓ Landing page gate passed — ${landingPages.length} pages, ` +
    `max pairwise similarity ${(maxPairwiseSimilarity(landingPages) * 100).toFixed(2)}% ` +
    `(ceiling ${(THRESHOLDS.maxSimilarity * 100).toFixed(0)}%)`,
);

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
