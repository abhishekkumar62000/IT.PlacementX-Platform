import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — ITPlacementX" }, { name: "description", content: "Answers to common questions about programs, pricing and placements." }] }),
  component: FAQ,
});

const faqs = [
  { q: "Do you guarantee placements?", a: "Career Accelerator ships with an offer guarantee based on eligibility criteria published at enrollment." },
  { q: "How are mentors selected?", a: "Every mentor has 9+ years of production experience at a top company and passes an internal panel." },
  { q: "Is this an EdTech course platform?", a: "No. We're a career-acceleration ecosystem — mentors, live training, projects, AI and hiring pipelines in one." },
  { q: "Can I switch programs?", a: "Yes — one switch is included in every paid plan." },
  { q: "Do you support working professionals?", a: "Yes, we run weekend-first tracks specifically for professionals targeting 2–4× salary hikes." },
];

function FAQ() {
  return (
    <SiteShell>
      <PageHeader eyebrow="FAQ" title="Answers, before you ask." />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="glass rounded-2xl p-2">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`i-${i}`} className="border-b border-border/60 last:border-none">
              <AccordionTrigger className="px-4 text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteShell>
  );
}