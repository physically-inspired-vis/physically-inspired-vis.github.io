const CODER_URL = "https://physically-inspired-vis.github.io/coder";

// BASE_URL-safe helper (works on GitHub Pages subpaths)
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`;
};

export function CodingInterfacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src={withBase("resources/interface screenshot.jpg")}
          alt="Coding Interface Preview"
          className="w-full h-auto"
        />
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <a
          href="https://physically-inspired-vis.github.io/coder/Code%20Book.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Open Code Book ↗
        </a>
        <a
          href={CODER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Open Coding Interface ↗
        </a>
      </div>
    </div>
  );
}
