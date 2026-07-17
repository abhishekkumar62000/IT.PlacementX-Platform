import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — ITPlacementX" }, { name: "description", content: "Terms of service." }] }),
  component: Terms,
});

function Terms() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <article className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground sm:px-6 lg:px-8">
        <p>By using ITPlacementX you agree to complete cohort commitments, act with integrity in mentor and hiring interactions, and abide by our community code of conduct.</p>
      </article>
    </SiteShell>
  );
}