// BASE_URL-safe helper (works on GitHub Pages subpaths). encodeURI keeps the
// slashes but escapes the space in the folder name.
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return encodeURI(`${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`);
};

// Participant numbering has gaps - these are the sessions with a result.
const participants = [
  "P1", "P2", "P3", "P4", "P5", "P6",
  "P7", "P8", "P9", "P10", "P11", "P12", "P14",
];

export function StudyPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        Study
      </h2>
      <p className="text-base text-muted-foreground leading-relaxed">
        Visualization concepts produced by participants during the study.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {participants.map((p) => (
          <figure key={p} className="flex flex-col gap-2">
            <a
              href={withBase(`study gallery/${p}.png`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden border border-border bg-muted hover:border-foreground transition-colors"
            >
              <img
                src={withBase(`study gallery/${p}.png`)}
                alt={`Visualization by participant ${p}`}
                loading="lazy"
                className="w-full aspect-[4/3] object-contain"
              />
            </a>
            <figcaption className="text-sm text-muted-foreground">{p}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
