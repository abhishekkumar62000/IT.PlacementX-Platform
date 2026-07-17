import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — ITPlacementX" }, { name: "description", content: "How we handle your data." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <article className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground sm:px-6 lg:px-8">
        <p>We only collect information required to deliver career-acceleration services: profile data, learning progress, resumes, and interactions with mentors and hiring partners. We never sell personal data.</p>
        <p className="mt-4">You may request export or deletion of your data anytime at privacy@itplacementx.com.</p>
      </article>
    </SiteShell>
  );
}