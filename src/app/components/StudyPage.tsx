import { useState } from "react";

// BASE_URL-safe helper (works on GitHub Pages subpaths). encodeURI keeps the
// slashes but escapes the space in the folder names.
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return encodeURI(`${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`);
};

// The live scene opens in VisArmature, which is a separate app on this origin;
// it reads the scene from ?scene= and renders it with the real 3D pipeline.
const sceneUrl = (participant: string, chrome: boolean) =>
  `${withBase("visarmature/")}?scene=${encodeURIComponent(withBase(`study JSONs/${participant}.json`))}` +
  (chrome ? "" : "&viewer=1");

// Participant numbering has gaps - these are the sessions with a result.
const participants = [
  "P1", "P2", "P3", "P4", "P5", "P6",
  "P7", "P8", "P9", "P10", "P11", "P12", "P14",
];

export function StudyPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        Study
      </h2>
      <p className="text-base text-muted-foreground leading-relaxed">
        Visualization concepts produced by participants during the study. Select
        one to open the scene in 3D — it loads on demand, so only the one you
        open is downloaded.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {participants.map((p) => {
          const open = openId === p;
          return (
            <figure
              key={p}
              className={`flex flex-col gap-2 ${open ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              {open ? (
                <div className="rounded-lg overflow-hidden border border-border bg-muted h-[70vh] min-h-[420px]">
                  <iframe
                    src={sceneUrl(p, false)}
                    title={`Scene by participant ${p}`}
                    className="w-full h-full border-0"
                    allow="fullscreen"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenId(p)}
                  className="block rounded-lg overflow-hidden border border-border bg-muted hover:border-foreground transition-colors text-left"
                >
                  <img
                    src={withBase(`study gallery/${p}.png`)}
                    alt={`Visualization by participant ${p}`}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-contain"
                  />
                </button>
              )}

              <figcaption className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{p}</span>
                {open && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenId(null)}
                      className="text-foreground hover:underline"
                    >
                      Close
                    </button>
                    <a
                      href={sceneUrl(p, true)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      Open full size ↗
                    </a>
                  </>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
