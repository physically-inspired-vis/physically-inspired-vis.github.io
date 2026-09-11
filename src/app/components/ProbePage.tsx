import { Info } from "lucide-react";

// BASE_URL-safe helper (works on GitHub Pages subpaths)
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`;
};

type Probe = {
  label: string;
  description: string;
  url: string;
  // A caveat about running the tool, ending in a link that is shown as-is.
  notice?: { text: string; href: string };
  video?: { src: string; poster: string; caption?: string };
};

// Each probe has its own tab, and its key doubles as that tab's id.
const probes: Record<"visarmature" | "visclay", Probe> = {
  visarmature: {
    label: "VisArmature",
    description:
      "VisArmature is a web-based prototype authoring tool for constructing 3D physically-inspired visualizations. Users can organize data into marks and nested collections, map data variables to physical attributes, and explore spatial arrangements, materials, geometries, and scene properties.",
    url: "https://physically-inspired-vis.github.io/visarmature",
    video: {
      src: "resources/visarmature_tutorial.mp4",
      poster: "resources/visarmature_tutorial.jpg",
      caption: "Here is the tutorial for VisArmature, used also as part of our user study.",
    },
  },
  visclay: {
    label: "VisClay",
    description:
      "VisClay is a web-based prototype authoring tool for exploring physical transformations and mechanisms as data encodings. Users can apply effects such as stretching, twisting, shattering, fluids, or particle behaviors to 3D objects, bind their parameters to data, and compare the resulting mappings across values.",
    url: "https://physically-inspired-vis.github.io/visclay",
    notice: {
      text: "All simulations except particles need a Blender headless server to run, and hence won't work in the browser. If Blender is installed in your machine, you can download the code here and run it locally:",
      href: "https://github.com/physically-inspired-vis/visclay",
    },
    video: {
      src: "resources/visclay_video.mp4",
      poster: "resources/visclay_video.jpg",
    },
  },
};

export function ProbePage({ id }: { id: keyof typeof probes }) {
  const probe = probes[id];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-5">
      <p className="text-base text-muted-foreground leading-relaxed">
        {probe.description}
      </p>

      <a
        href={probe.url}
        target="_blank"
        rel="noopener noreferrer"
        className="self-center px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-base font-medium transition-colors"
      >
        Open {probe.label} →
      </a>

      {probe.notice && (
        <div className="self-center max-w-3xl flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 leading-relaxed">
          <Info className="size-4 shrink-0 mt-0.5" />
          <p>
            {probe.notice.text}{" "}
            <a
              href={probe.notice.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full underline break-words hover:text-amber-700 transition-colors"
            >
              {probe.notice.href.replace(/^https:\/\//, "")}
            </a>
          </p>
        </div>
      )}

      {probe.video && (
        <div className="mt-6 flex flex-col gap-5">
          {probe.video.caption && (
            <p className="text-base text-muted-foreground leading-relaxed">
              {probe.video.caption}
            </p>
          )}
          {/* The poster stands in until the viewer presses play - iOS never
              preloads, so without it the box would sit black. */}
          <video
            src={withBase(probe.video.src)}
            poster={withBase(probe.video.poster)}
            controls
            playsInline
            preload="metadata"
            className="w-full rounded-lg shadow-lg bg-black"
          />
        </div>
      )}
    </div>
  );
}
