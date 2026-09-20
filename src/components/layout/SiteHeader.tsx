"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import { meta } from "@/data/beone";

export const NAV = [
  { id: "spine", label: "Spine" },
  { id: "capability", label: "Capability" },
  { id: "projects", label: "Projects" },
  { id: "integration", label: "Integration" },
  { id: "proof", label: "Proof" },
  { id: "materials", label: "Materials" },
] as const;

/** True while the element with this id intersects the viewport. */
function useInView(id: string) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return inView;
}

export function SiteHeader() {
  // Orange is reserved for the single primary action in any viewport.
  // When the RFP form itself is on screen, the header action steps down.
  const contactVisible = useInView("contact");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="text-base font-semibold tracking-tight">
          {meta.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: contactVisible ? "outline" : "default", size: "lg" }), "px-3")}
          >
            Send an RFP
          </a>
          <details className="relative lg:hidden">
            <summary
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}
              aria-label="Sections menu"
            >
              <Menu aria-hidden="true" />
            </summary>
            <nav
              aria-label="Sections"
              className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover p-1 shadow-sm"
            >
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-muted"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
