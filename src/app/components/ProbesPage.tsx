// BASE_URL-safe helper (works on GitHub Pages subpaths)
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`;
};

const probes = [
  {
    id: "vis-armature",
    label: "VisArmature",
    image: "resources/probe1.png",
    url: "https://physically-inspired-vis.github.io/visarmature",
  },
  {
    id: "vis-clay",
    label: "VisClay",
    image: "resources/probe2.png",
    url: "https://physically-inspired-vis.github.io/visclay",
  },
];

export function ProbesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        Probes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {probes.map((probe) => (
          <div key={probe.id} className="flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={withBase(probe.image)}
                alt={probe.label}
                className="w-full h-auto"
              />
            </div>
            <a
              href={probe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Open {probe.label} ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
