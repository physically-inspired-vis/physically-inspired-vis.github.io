import { ArrowUpRight } from "lucide-react";

// BASE_URL-safe helper (works on GitHub Pages subpaths). encodeURI keeps the
// slashes but escapes the space in the folder names.
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return encodeURI(`${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`);
};

// A concept opens in VisArmature, which is a separate app on this origin; it
// reads the scene from ?scene= and loads it into the editor.
const exampleUrl = (concept: string) =>
  `${withBase("visarmature/")}?scene=${encodeURIComponent(withBase(`study JSONs/${concept}.json`))}`;

// Participant numbering has gaps - these are the sessions with a result. A
// participant with more than one concept has them numbered "P1.1", "P1.2".
const concepts = [
  "P1.1", "P1.2", "P2", "P3", "P4", "P5", "P6", "P7", "P8",
  "P9.1", "P9.2", "P10", "P11", "P12", "P13", "P14", "P15.1", "P15.2",
];

// The label names the participant, so both of P1's concepts read "P1".
const participantOf = (concept: string) => concept.replace(/\.\d+$/, "");

export function StudyPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          User Study
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          We conducted one-hour sessions with 15 visualization and 3D design experts to explore how practitioners use and reason about our design space during creation. Participants first ideated a visualization from one of three datasets, then used VisArmature to develop and explore their concept while thinking aloud. We subsequently introduced additional physical transformations through VisClay examples and discussed their experience with using the design space, the considerations behind their design choices and opportunities for future authoring tools.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Participants’ gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {concepts.map((concept) => {
            const participant = participantOf(concept);
            return (
              <figure key={concept} className="flex flex-col gap-2">
                <div className="rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={withBase(`study gallery/${concept}.png`)}
                    alt={`Visualization by participant ${participant}`}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-contain"
                  />
                </div>

                <figcaption className="flex items-center justify-between gap-3 text-sm text-foreground">
                  <span>{participant}</span>
                  <a
                    href={exampleUrl(concept)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    See example
                    <ArrowUpRight className="size-3" />
                  </a>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}
