import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { LifeBuoy, MessageSquare, BookOpen } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — ITPlacementX" }] }),
  component: Support,
});

function Support() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Support" title="We're here to help." description="Reach the support team or browse our knowledge base." />
      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[
          { i: LifeBuoy, t: "24/7 Support", d: "support@itplacementx.com" },
          { i: MessageSquare, t: "Live Chat", d: "Chat with our team" },
          { i: BookOpen, t: "Knowledge Base", d: "Guides & FAQs" },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="glass rounded-xl p-6">
            <Icon className="h-5 w-5 text-[var(--brand)]" />
            <div className="mt-3 font-display text-lg font-semibold">{t}</div>
            <div className="text-sm text-muted-foreground">{d}</div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}