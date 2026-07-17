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
  Heart,
  Linkedin,
  Clock,
  Share2,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mentorship-program/google/mehul-sampath")({
  head: () => ({
    meta: [
      { title: "Mehul Sampath — Google Mentor | ITPlacementX" },
      {
        name: "description",
        content:
          "View Mehul Sampath's full Google mentor profile, services, reviews, and mentorship details.",
      },
    ],
  }),
  component: MehulSampathPage,
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
    kind: "Query",
    title: "Quick Query | AMA",
    duration: "48 Hrs",
    cta: "Ask Query",
    price: "₹99",
    originalPrice: "₹199",
  },
  {
    kind: "1:1 Call",
    title: "Quick call | AMA",
    duration: "15 Min",
    cta: "Book Now",
    price: "₹249",
    originalPrice: "₹299",
    tags: ["Best Seller"],
  },
  {
    kind: "1:1 Call",
    title: "CV Review, Mock Interviews and Tips",
    duration: "30 Min",
    cta: "Book Now",
    price: "₹799",
    originalPrice: "₹999",
  },
  {
    kind: "1:1 Call",
    title: "How to clear Sales & Marketing interviews?",
    duration: "45 Min",
    cta: "Book Now",
    price: "₹999",
    originalPrice: "₹1199",
  },
  {
    kind: "Resource",
    title: "Cracking B-School Case Competitions | Ultimate Resource Kit with 9 winning PPTs",
    cta: "Purchase",
    price: "₹499",
    originalPrice: "₹699",
  },
];

const profileSections = [
  {
    value: "about",
    label: "About",
    content:
      "'Product is what you believe, marketing is how you get other people to believe it.' Trying to embody this in my day-to-day as a DMS at Google. Big-time case competition geek. I have won a few laurels with IColaL, Accenture, Microsoft, and Salesforce. I would be happy to help you in areas related to 1. Case competitions 2. Landing live projects & internships 3. Cracking Marketing and Google interviews 4. Resume building 5. General MBA queries.",
  },
  {
    value: "topics",
    label: "Topics",
    content: [
      "Ace MBA Entrance Preparations",
      "Crack Case Study and Innovation Challenges",
      "Grow your career",
      "Get your Resume/CV reviewed",
      "Pass Interviews",
    ],
  },
  {
    value: "skills",
    label: "Skills",
    content: [
      "Sales and Marketing",
      "Case Study Competitions and Innovation Challenges",
      "CAT Preparation",
      "Resume & CV Review",
      "Interview Preparations",
      "+3",
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
    content: [
      "Indian Institute of Management (IIM), Kozhikode · MBA · 2020 - 2022",
      "National Institute of Electronics and Information Technology (NIEITA), Aurangabad · B.Tech · 2016 - 2020",
    ],
  },
  {
    value: "work",
    label: "Work Experience",
    content: ["AGM Prepaid Segment, Vodafone Idea Limited · 2022 - Present"],
  },
];

const reviews = [
  {
    name: "Utkarsh Ahuja",
    date: "13 Dec 25, 02:41 PM IST",
    rating: "5.0★",
    text: "Mentor is a no show to the session. Please return the mentorship fee or reschedule another session to compensate for the same.",
  },
  {
    name: "Alisha Khattar",
    date: "10 Oct 25, 08:24 PM IST",
    rating: "5.0★",
    text: "Amazing amazing session, and even greater clarity!!",
  },
  {
    name: "Lakshita Tyagi",
    date: "27 Aug 25, 07:15 PM IST",
    rating: "5.0★",
    text: "Hello really knows what he is doing.",
  },
  {
    name: "Tanish Biswas",
    date: "10 Aug 25, 04:40 PM IST",
    rating: "5.0★",
    text: "Sir's insight was really helpful and informative",
  },
  {
    name: "Parita Premji Makvana",
    date: "28 Jul 25, 07:19 PM IST",
    rating: "5.0★",
    text: "Mehul was really helpful. It was great connecting with him and getting all of my doubts resolved.",
  },
  {
    name: "NITIN MISHRA",
    date: "23 Jul 25, 11:03 PM IST",
    rating: "5.0★",
    text: "I recently took a mock presentation interview session with Mehul and it was very helpful.",
  },
];

function MehulSampathPage() {
  const mentorName = "Mehul Sampath";

  return (
    <SiteShell>
      <div className="relative min-h-screen overflow-hidden bg-background pb-16 text-foreground">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-r from-blue-600 via-sky-600 to-cyan-500" />
        <div className="absolute inset-x-0 top-24 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_65%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/mentorship-program/google"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Google Mentors
          </Link>

          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="overflow-hidden rounded-[28px] border border-border/60 bg-background/95 shadow-2xl shadow-black/10 backdrop-blur">
              <div className="relative px-6 pb-6 pt-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    google
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
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600"
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
                    Marketing at Google | MBA IIM K22 | Case competition enthusiast | All things MBA
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5">
                      <Calendar className="h-4 w-4" /> 3 years of Experience
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
                    60 Mentee Engagements
                  </div>
                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">
                    98% Average Attendance
                  </div>
                </div>

                <div className="mt-6">
                  <h1 className="text-2xl font-semibold sm:text-3xl">Available Services</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover our mentorship offerings designed for your success
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {['All', '1:1 Call', 'Query', 'Resources'].map((chip, index) => (
                    <button
                      key={chip}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        index === 0
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'border border-border/60 bg-card text-muted-foreground hover:text-foreground'
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
                      className="group rounded-3xl border border-border/60 bg-[#eef6ff] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
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

                      <h2 className="mt-3 text-lg font-semibold text-foreground">{service.title}</h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        {service.duration ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {service.duration}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-full bg-white px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toast.success(`${service.cta} for ${service.title} started`)}
                          className="text-sm font-semibold text-foreground hover:text-blue-700"
                        >
                          {service.cta}
                        </button>

                        <div className="flex items-center gap-2 text-sm font-semibold">
                          {service.originalPrice ? (
                            <span className="text-muted-foreground line-through">{service.originalPrice}</span>
                          ) : null}
                          <span className={service.price === 'Free' ? 'text-emerald-600' : 'text-blue-600'}>
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-border/60 bg-background/90 p-6 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-border/60 bg-card px-4 py-4 text-center">
                    <div className="text-3xl font-semibold text-foreground">4.7</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Average Rating
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">(18 Reviews)</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {reviews.map((review) => (
                      <div key={review.name} className="rounded-2xl border border-border/60 bg-card/70 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-foreground">{review.name}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="rounded-md bg-emerald-500 px-2 py-1 text-[11px] font-bold text-white">
                            {review.rating}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Mentorship style", value: "Practical and career-focused" },
                  { label: "Best for", value: "MBA aspirants and marketing profiles" },
                  { label: "Response", value: "Usually within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/60 bg-card/70 p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
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
