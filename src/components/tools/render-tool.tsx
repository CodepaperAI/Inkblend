import { ArtworkResolutionTool } from "@/components/tools/artwork-resolution";
import { QuotePlannerTool } from "@/components/tools/quote-planner";
import { ServiceAreaTool } from "@/components/tools/service-area";
import { WallReadinessTool } from "@/components/tools/wall-readiness";
import type { ToolId } from "@/data/landingPages/types";

/**
 * Maps a record's `toolId` to its component.
 *
 * A switch rather than a lookup object so TypeScript's exhaustiveness checking
 * applies — adding a ToolId without handling it here becomes a compile error
 * rather than a page that silently renders nothing.
 */
export function RenderTool({
  toolId,
  sourcePage,
  compact = false,
}: {
  readonly toolId: ToolId;
  readonly sourcePage: string;
  readonly compact?: boolean;
}) {
  switch (toolId) {
    case "wall-readiness":
      return <WallReadinessTool sourcePage={sourcePage} compact={compact} />;
    case "artwork-resolution":
      return <ArtworkResolutionTool sourcePage={sourcePage} compact={compact} />;
    case "quote-planner":
      return <QuotePlannerTool sourcePage={sourcePage} compact={compact} />;
    case "service-area":
      return <ServiceAreaTool sourcePage={sourcePage} />;
    default: {
      const exhaustive: never = toolId;
      throw new Error(`Unhandled toolId: ${String(exhaustive)}`);
    }
  }
}
