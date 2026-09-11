import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const CODER_URL = "https://physically-inspired-vis.github.io/coder";
const CODEBOOK_URL = `${CODER_URL}/Code%20Book.pdf`;

// BASE_URL-safe helper (works on GitHub Pages subpaths)
const withBase = (relPath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "/")}${relPath.replace(/^\/+/, "")}`;
};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="text-base text-muted-foreground leading-relaxed">
      {children}
    </p>
  );
}

export function CodingInterfacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <SectionTitle>Coding process</SectionTitle>
        <Body>
          We analyzed the corpus through an iterative hierarchical coding process, progressively decomposing each visualization into visual elements and characterizing the physical attributes, semantic dimensions associated and implied mechanisms associated with them.
        </Body>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle>Codebook</SectionTitle>
        {/* Desktop browsers show the PDF in place. Phones mostly cannot -
            Android draws an empty box, iOS only the first page - so there
            the frame is hidden and the link beneath opens the PDF whole. */}
        <iframe
          src={CODEBOOK_URL}
          title="Codebook"
          className="hidden md:block w-full h-[60vh] min-h-[400px] rounded-lg border border-border"
        />
        <a
          href={CODEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Open the codebook in a new tab
          <ArrowUpRight className="size-3.5" />
        </a>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle>Coding interface</SectionTitle>
        <Body>
          The coding interface operationalized this hierarchy, allowing coders to navigate nested visual elements and assign codes at the appropriate level while keeping their relationships visible.
        </Body>
        <a
          href={CODER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-center px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-base font-medium transition-colors"
        >
          Open Coding Interface →
        </a>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={withBase("resources/interface screenshot.png")}
            alt="The coding interface"
            className="w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
}
