import type { ReactNode } from "react";

/** Title block shared by the inner pages, lit softly from the upper right. */
export function PageIntro({
  title,
  lead,
  status,
  children,
}: {
  title: string;
  lead?: string;
  /** short state line, e.g. "Opening in the next phase" */
  status?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-clip">
      <div aria-hidden className="beam beam-soft in-beam" />
      <div className="wrap page-top relative grid gap-10 pb-16 md:grid-cols-12 md:pb-24">
        <div className="md:col-span-7">
          {status ? (
            <p className="t-label mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-3.5 py-2 text-silver">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-flood" />
              {status}
            </p>
          ) : null}
          <h1 className="t-title">{title}</h1>
          {lead ? <p className="t-lead mt-7 max-w-[36ch]">{lead}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
