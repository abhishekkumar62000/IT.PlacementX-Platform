import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Heart,
  Linkedin,
  MessageSquare,
  Share2,
  Star,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mentorship-program/amazon/sourav-aggarwal")({
  head: () => ({
    meta: [
      { title: "Sourav Aggarwal — Amazon Mentor | ITPlacementX" },
      {
        name: "description",
        content:
          "View Sourav Aggarwal's full Amazon mentor profile, availability, experience, and mentorship services.",
      },
    ],
  }),
  component: SouravAggarwalPage,
});

type Service = {
  kind: "1:1 Call" | "Query" | "Resource";
  title: string;
  duration?: string;
  cta: string;
  price: string;
  originalPrice?: string;
  tags?: string[];
};

const services: Service[] = [
  {
    kind: "Resource",
    title: "Case Comp Decks",
    cta: "Download",
    price: "Free",
    originalPrice: "₹500",
    tags: ["Best Seller"],
  },
  {
    kind: "1:1 Call",
    title: "Quick Call",
    duration: "15 Min",
    cta: "Book Now",
    price: "₹70",
    originalPrice: "₹200",
  },
  {
    kind: "1:1 Call",
    title: "Resume Review",
    duration: "30 Min",
    cta: "Book Now",
    price: "₹199",
    originalPrice: "₹300",
  },
  {
    kind: "1:1 Call",
    title: "Mock Interviews - Business Profiles",
    duration: "30 Min",
    cta: "Book Now",
    price: "₹129",
    originalPrice: "₹499",
  },
  {
    kind: "1:1 Call",
    title: "MBA Entrance",
    duration: "30 Min",
    cta: "Book Now",
    price: "₹129",
    originalPrice: "₹300",
  },
  {
    kind: "1:1 Call",
    title: "Excel Crash Course",
    duration: "60 Min",
    cta: "Book Now",
    price: "₹249",
    originalPrice: "₹800",
  },
  {
    kind: "1:1 Call",
    title: "30 min Mentor Meet",
    duration: "30 Min",
    cta: "Book Now",
    price: "₹129",
    originalPrice: "₹500",
  },
  {
    kind: "Query",
    title: "Ask a Query",
    duration: "3 Days",
    cta: "Ask Query",
    price: "Free",
    originalPrice: "₹100",
  },
];

const profileSections = [
  {
    value: "about",
    label: "About",
    content:
      "Sourav has completed his MBA from MDI Gurgaon and joining Amazon as Program Manager. Previously, he worked with Swiggy, India's leading food delivery platform, in the central Ads team and led the ads planning and strategy. Before that, he worked with Management Consulting firms ZS & IQVIA, providing MR and data warehousing solutions to US-based Fortune 500 clients. Apart from his professional life, he loves photography, writing articles, and reading business books.",
  },
  {
    value: "topics",
    label: "Topics",
    content: [
      "Marketing Strategy",
      "Case Competitions",
      "MBA Admissions",
      "Ads Planning",
      "Career Growth",
    ],
  },
  {
    value: "skills",
    label: "Skills",
    content: [
      "Ads Strategy",
      "Growth Marketing",
      "Stakeholder Management",
      "Business Strategy",
      "Brand Positioning",
    ],
  },
  {
    value: "fluent",
    label: "Fluent in",
    content: ["English", "Hindi"],
  },
  {
    value: "education",
    label: "Education",
    content: ["MBA, MDI Gurgaon", "B.Tech, NIT Kurukshetra"],
  },
  {
    value: "work",
    label: "Work Experience",
    content: [
      "Program Manager, Amazon",
      "Ads Strategy, Swiggy",
      "Management Consulting, ZS",
      "Analytics, IQVIA",
    ],
  },
];

function SouravAggarwalPage() {
  const mentorName = "Sourav Aggarwal";

  return (
    <SiteShell>
      <div className="relative min-h-screen overflow-hidden bg-background pb-16 text-foreground">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-500" />
        <div className="absolute inset-x-0 top-24 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_65%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/mentorship-program/amazon"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Amazon Mentors
          </Link>

          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="overflow-hidden rounded-[28px] border border-border/60 bg-background/95 shadow-2xl shadow-black/10 backdrop-blur">
              <div className="relative px-6 pb-6 pt-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    amazon
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success(`Saved ${mentorName} to your favorites`)}
                    className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:text-rose-500"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="mx-auto w-fit">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=600"
                      alt={mentorName}
                      className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                      Available
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                    {mentorName}
                    <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
                      <Star className="h-4 w-4 fill-current" /> 4.7
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Program Manager @ Amazon | MDI Gurgaon &#39;25 | Ads Strategy @ Swiggy | Ex-ZS
                    Associates | NIT Kurukshetra &#39;19 | 10 Case Comp Titles
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5">
                      <Calendar className="h-4 w-4" /> 4 years of Experience
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => toast.success("Opening LinkedIn profile")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-[#0A66C2] transition-transform hover:scale-105"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success("Sharing mentor profile")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-transform hover:scale-105"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/60 px-5 py-2">
                <Accordion type="single" collapsible defaultValue="about" className="w-full">
                  {profileSections.map((section) => (
                    <AccordionItem key={section.value} value={section.value}>
                      <AccordionTrigger className="px-1 text-sm font-semibold">
                        {section.label}
                      </AccordionTrigger>
                      <AccordionContent className="px-1 text-sm leading-7 text-muted-foreground">
                        {Array.isArray(section.content) ? (
                          <div className="flex flex-wrap gap-2">
                            {section.content.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p>{section.content}</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </aside>

            <main className="space-y-6">
              <section className="rounded-[28px] border border-border/60 bg-background/90 p-6 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Top Mentor
                  </div>
                  <div className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-foreground">
                    614 Mentee Engagements
                  </div>
                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">
                    97% Average Attendance
                  </div>
                </div>

                <div className="mt-6">
                  <h1 className="text-2xl font-semibold sm:text-3xl">Available Services</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover mentorship offerings designed for your success
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {["All", "1:1 Call", "Query", "Resources"].map((chip, index) => (
                    <button
                      key={chip}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        index === 0
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                          : "border border-border/60 bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {services.map((service) => (
                    <article
                      key={service.title}
                      className="group rounded-3xl border border-border/60 bg-[#faf7ff] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                        <span className="rounded-full bg-white px-2 py-1 text-amber-600 shadow-sm">
                          {service.kind}
                        </span>
                        {service.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white px-2 py-1 text-slate-600 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="mt-3 text-lg font-semibold text-foreground">
                        {service.title}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        {service.duration ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {service.duration}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Download className="h-4 w-4" /> Download
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-full bg-white px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            toast.success(`${service.cta} for ${service.title} started`)
                          }
                          className="text-sm font-semibold text-foreground hover:text-violet-700"
                        >
                          {service.cta}
                        </button>

                        <div className="flex items-center gap-2 text-sm font-semibold">
                          {service.originalPrice ? (
                            <span className="text-muted-foreground line-through">
                              {service.originalPrice}
                            </span>
                          ) : null}
                          <span
                            className={
                              service.price === "Free" ? "text-emerald-600" : "text-violet-600"
                            }
                          >
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Mentorship style", value: "Practical and direct" },
                  { label: "Best for", value: "MBA aspirants and growth roles" },
                  { label: "Response", value: "Usually within 24 hours" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border/60 bg-card/70 p-5"
                  >
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
                  </div>
                ))}
              </section>
            </main>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
