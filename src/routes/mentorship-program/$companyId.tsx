import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useState } from "react";
import {
  Search,
  Star,
  ArrowLeft,
  Briefcase,
  Users,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Filter,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mentorship-program/$companyId")({
  head: ({ params }) => {
    const name = params.companyId.charAt(0).toUpperCase() + params.companyId.slice(1);
    return {
      meta: [
        { title: `${name} Mentors — ITPlacementX` },
        {
          name: "description",
          content: `Book 1:1 sessions with senior ${name} engineers. Personalized mentorship, resume reviews, and placement referrals.`,
        },
      ],
    };
  },
  component: CompanyMentorsPage,
});

type CallOption = {
  title: string;
  subtitle: string;
  originalPrice: number;
  price: number;
};

type Mentor = {
  name: string;
  rating: number;
  reviews: number;
  role: string;
  experience: string;
  sessions: string;
  attendance: string;
  avatar: string;
  sessionsList: CallOption[];
  hasTrophy?: boolean;
};

const companyList = [
  { id: "amazon", name: "Amazon", domain: "amazon.com", color: "#FF9900" },
  { id: "google", name: "Google", domain: "google.com", color: "#4285F4" },
  { id: "microsoft", name: "Microsoft", domain: "microsoft.com", color: "#00a4ef" },
  { id: "meta", name: "Meta", domain: "meta.com", color: "#0866FF" },
  { id: "apple", name: "Apple", domain: "apple.com", color: "#555555" },
  { id: "netflix", name: "Netflix", domain: "netflix.com", color: "#E50914" },
  { id: "stripe", name: "Stripe", domain: "stripe.com", color: "#635bff" },
  { id: "uber", name: "Uber", domain: "uber.com", color: "#1a1a1a" },
  { id: "atlassian", name: "Atlassian", domain: "atlassian.com", color: "#0052CC" },
  { id: "spotify", name: "Spotify", domain: "spotify.com", color: "#1DB954" },
  { id: "ibm", name: "IBM", domain: "ibm.com", color: "#006699" },
  { id: "oracle", name: "Oracle", domain: "oracle.com", color: "#F80000" },
  { id: "adobe", name: "Adobe", domain: "adobe.com", color: "#FA0F00" },
  { id: "flipkart", name: "Flipkart", domain: "flipkart.com", color: "#F74D01" },
];

const amazonMentors: Mentor[] = [
  {
    name: "Sourav Aggarwal",
    rating: 4.7,
    reviews: 53,
    role: "Program Manager @ Amazon | MDI Gurgaon '25 | Ads Strategy @ Swiggy | Ex-ZS Associates | NIT Kurukshetra '19 | 10 Case...",
    experience: "4 Years",
    sessions: "612 Sessions",
    attendance: "97%",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    hasTrophy: true,
    sessionsList: [
      { title: "Case Comp Decks", subtitle: "Resource", originalPrice: 500, price: 0 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 200, price: 70 },
    ],
  },
  {
    name: "Purvabh Surana",
    rating: 5.0,
    reviews: 2,
    role: "Senior Program Manager at Amazon | Process & Policy Design | E Commerce | Retail",
    experience: "1 Year",
    sessions: "3 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 500 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 1000 },
    ],
  },
  {
    name: "Madhav Pitaliya",
    rating: 5.0,
    reviews: 2,
    role: "Program Manager @ Amazon | Ex-Tracxn | IISER Mohali '22 | MS (Biological Science) | DST INSPIRE Scholar",
    experience: "4 Years",
    sessions: "7 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 100, price: 50 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 250 },
    ],
  },
  {
    name: "Priyal Patel",
    rating: 0,
    reviews: 0,
    role: "Amazon PPO | IIM K Top 10%ile | Goldman Sachs | EY LLP|Computer Science, D.J. Sanghvi College of Engineering",
    experience: "1 Year",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 700, price: 499 },
      { title: "Ask a Query", subtitle: "Query", originalPrice: 99, price: 99 },
    ],
  },
  {
    name: "Rajat Bhattacharjee",
    rating: 0,
    reviews: 0,
    role: "Sr Supply Chain Manager at Amazon | Ex Godrej, Britannia, ITC | Ex Indian Army",
    experience: "18 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 500 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 1000 },
    ],
  },
  {
    name: "Rachit Singh",
    rating: 4.7,
    reviews: 3,
    role: "Head Vendor Services at Amazon EU | IIM Lucknow | Ex Godrej, L'Oréal, TCS",
    experience: "13 Years",
    sessions: "4 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Amazon Interview Prep", subtitle: "1:1 Call", originalPrice: 1499, price: 1499 },
      {
        title: "Job Opportunities in Germany",
        subtitle: "1:1 Call",
        originalPrice: 1499,
        price: 1499,
      },
    ],
  },
  {
    name: "Anjan Mukherjee",
    rating: 0,
    reviews: 0,
    role: "Cloud Support Engineering Manager @ AWS | MSc IT @ Punjab Technical University| ex-NatWest, IBM, Accenture",
    experience: "6 Years",
    sessions: "",
    attendance: "0%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1500, price: 1000 },
      { title: "Ask a Query", subtitle: "Query", originalPrice: 200, price: 100 },
    ],
  },
  {
    name: "Purva Sharma",
    rating: 5.0,
    reviews: 1,
    role: "SDE @Amazon | CSE VIT'25 @VIT Vellore | Ex- Analyst @ION Group, Tech Intern @Fidelity International",
    experience: "1 Year",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Mentor Meet", subtitle: "1:1 Call", originalPrice: 1500, price: 1100 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 1000, price: 850 },
    ],
  },
  {
    name: "Gagandeep Verma",
    rating: 5.0,
    reviews: 10,
    role: "Category Manager @ Amazon | Ex- Reckitt, Nestle | IIM Ahmedabad",
    experience: "5 Years",
    sessions: "299 Sessions",
    attendance: "70%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    hasTrophy: true,
    sessionsList: [
      { title: "Placement Interview - HR ...", subtitle: "Resource", originalPrice: 299, price: 0 },
      { title: "Ask me Anything (AMA!)", subtitle: "1:1 Call", originalPrice: 499, price: 199 },
    ],
  },
  {
    name: "Pooja Kanodia",
    rating: 0,
    reviews: 0,
    role: "Manager @ Amazon | Ex- Zomato | MBA - NMIMS | Career Guidance | Interview Preparation | Resume Building | Mock...",
    experience: "9 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Resume Review", subtitle: "1:1 Call", originalPrice: 1000, price: 199 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 2500, price: 499 },
    ],
  },
  {
    name: "Tushar Jejani",
    rating: 0,
    reviews: 0,
    role: "Amazon | IIM Lucknow | SSCBS | CFA L2c | 30+ Int'l & Nat'l Awards | CV Reviews | GD-PI | Profile Building",
    experience: "2 Years",
    sessions: "2 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "General Career Guidance", subtitle: "1:1 Call", originalPrice: 299, price: 299 },
      { title: "Mock Personal Interview", subtitle: "1:1 Call", originalPrice: 399, price: 399 },
    ],
  },
  {
    name: "Nitin Sadana",
    rating: 0,
    reviews: 0,
    role: "Supply Chain Leader @Amazon | PGDIM @IIM Mumbai'10 | Ex- ITC, Intern @Procter & Gamble",
    experience: "15 Years",
    sessions: "1 Session",
    attendance: "33%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 50, price: 50 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 100, price: 100 },
    ],
  },
  {
    name: "Yash Dave",
    rating: 0,
    reviews: 0,
    role: "Amazon | IIM Indore'22 | Tata Motors| IIT BHU '18",
    experience: "2 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Ask a Query", subtitle: "Query", originalPrice: 100, price: 50 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 200 },
    ],
  },
  {
    name: "Kumar Abhishek Abhishek",
    rating: 5.0,
    reviews: 1,
    role: "Program Manager @Amazon | MBA'25 @UW Foster, PGDM'17 @IIM Raipur, BTech Chemical Eng'15 @HBTU | Ex- 7 Eleven,...",
    experience: "7 Years",
    sessions: "3 Sessions",
    attendance: "60%",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 0, price: 0 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 0, price: 0 },
    ],
  },
];

const googleMentors: Mentor[] = [
  {
    name: "Mehul Sampath",
    rating: 4.7,
    reviews: 18,
    role: "Marketing at Google | MBA IIM K22 | Case competition enthusiast | All things MBA",
    experience: "3 Years",
    sessions: "60 Sessions",
    attendance: "98%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Query | AMA", subtitle: "Query", originalPrice: 100, price: 99 },
      { title: "Quick call | AMA", subtitle: "1:1 Call", originalPrice: 299, price: 249 },
    ],
  },
  {
    name: "Ankit Virkhede",
    rating: 4.8,
    reviews: 124,
    role: "Network Implementation Engineer @Google | BE in E&TC | Ex-Cisco, Accenture, Fiserv | Helping you break into FAANG",
    experience: "8 Years",
    sessions: "7,092 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      {
        title: "Quick Call / Tech Discussion",
        subtitle: "1:1 Call",
        originalPrice: 1000,
        price: 300,
      },
      {
        title: "Mentor Meet / Career Guidance",
        subtitle: "1:1 Call",
        originalPrice: 1500,
        price: 500,
      },
    ],
  },
  {
    name: "Nipun Mittal",
    rating: 5.0,
    reviews: 7,
    role: "Software Engineer III @ Google | GATE'19 CSE AIR 3 | ACM ICPC'17 Kanpur Regionals | 25k on LinkedIn | elitmus 99.86 score",
    experience: "5 Years",
    sessions: "22 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Discuss Anything", subtitle: "1:1 Call", originalPrice: 1000, price: 900 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 500 },
    ],
  },
  {
    name: "Rithik Rai",
    rating: 5.0,
    reviews: 1,
    role: "Program Manager @Google | PGDM@GIM'22 | Ex-Bain&Company, Amazon, Paypal",
    experience: "6 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Ask a Query", subtitle: "Query", originalPrice: 300, price: 300 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1500, price: 1000 },
    ],
  },
  {
    name: "Jai Shrivastava",
    rating: 5.0,
    reviews: 2,
    role: "Google | Ex-Xiaomi Ads | MBA MCA | P&G National Winner | Marketing & Communication | Podcast Host",
    experience: "3 Years",
    sessions: "10 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    hasTrophy: true,
    sessionsList: [
      { title: "Building Confidence", subtitle: "1:1 Call", originalPrice: 299, price: 149 },
      { title: "In Depth - CV Review", subtitle: "1:1 Call", originalPrice: 150, price: 99 },
    ],
  },
  {
    name: "Nutan Karamcheti",
    rating: 0,
    reviews: 0,
    role: "Technical Program Manager @Google | Stanford University | Ex - Ivy CompTech",
    experience: "20 Years",
    sessions: "1 Session",
    attendance: "50%",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Ask a Query", subtitle: "Query", originalPrice: 100, price: 100 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 1000 },
    ],
  },
  {
    name: "Himanshu Goyal",
    rating: 0,
    reviews: 0,
    role: "Senior Manager at Google Gemini | IIT, Roorkee | Ex-Cisco",
    experience: "4 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Ask a Query", subtitle: "Query", originalPrice: 100, price: 100 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 1000 },
    ],
  },
  {
    name: "Rajeev Singh",
    rating: 5.0,
    reviews: 5,
    role: "Project Manager @Google | BTech CSE'22 @Gurukula Kangri Vishwavidyalaya | Ex - Jio Platforms, Cognizant",
    experience: "4 Years",
    sessions: "7 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1099, price: 999 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 699, price: 399 },
    ],
  },
  {
    name: "Umesh Gawale",
    rating: 5.0,
    reviews: 1,
    role: "Google-YouTube | IIM Bangalore | Nat'l Winner - Tata Imagination Challenge & Reliance TUP | Ex-Paytm, Ex-MuSigma",
    experience: "7 Years",
    sessions: "2 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 349 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 899 },
    ],
  },
  {
    name: "Supratim Das",
    rating: 0,
    reviews: 0,
    role: "Hardware Generalist @ Google | Ex - eXponent Energy | Ex - Tataanl Energy | Ex - HCL Technology | E - Mobility, Energy...",
    experience: "4 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 0, price: 150 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 899 },
    ],
  },
  {
    name: "Nafees Armaan",
    rating: 0,
    reviews: 0,
    role: "Digital Marketing Coach | Performance Marketer",
    experience: "5 Years",
    sessions: "59 Sessions",
    attendance: "75%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "How To Make a Quick Opti...", subtitle: "1:1 Call", originalPrice: 399, price: 99 },
      {
        title: "Top 10 Free Digital Marketi...",
        subtitle: "Resource",
        originalPrice: 99,
        price: 0,
      },
    ],
  },
  {
    name: "Surya Bhavana",
    rating: 5.0,
    reviews: 2,
    role: "Cybersecurity Engineer | Zero Trust & Cloud Security Specialist | Python & AI-ML Expert | Innovating secure data solutions for...",
    experience: "1 Year",
    sessions: "3 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 2500, price: 1500 },
      { title: "Ask a Query", subtitle: "Query", originalPrice: 450, price: 200 },
    ],
  },
];

const microsoftMentors: Mentor[] = [
  {
    name: "Srikanth Sriramgiri",
    rating: 5.0,
    reviews: 12,
    role: "Supply Chain Leader at Microsoft | Ex-Tata Aerospace | BITS Pilani | IIT KGP",
    experience: "15 Years",
    sessions: "26 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      {
        title: "CV and Interview Preparation",
        subtitle: "1:1 Call",
        originalPrice: 499,
        price: 449,
      },
      { title: "Career Guidance", subtitle: "1:1 Call", originalPrice: 799, price: 749 },
    ],
  },
  {
    name: "Karanvir Singh",
    rating: 5.0,
    reviews: 3,
    role: "Microsoft | SPJIMR'24 (Dean's Top Twenty & Dean's Merit List) | P&G | OJEMS'23 | EY | Maruti Suzuki",
    experience: "6 Years",
    sessions: "11 Sessions",
    attendance: "91%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 399 },
      { title: "Ask a Query", subtitle: "Query", originalPrice: 100, price: 100 },
    ],
  },
  {
    name: "Arpita Samanta",
    rating: 0,
    reviews: 0,
    role: "Strategic Partner Development Manager @Microsoft | MBA (IIT-Delhi) | Ex-Vodafone Idea",
    experience: "6 Years",
    sessions: "1 Session",
    attendance: "0%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 500 },
      { title: "45 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 2000, price: 1500 },
    ],
  },
  {
    name: "Muskan Handa",
    rating: 0,
    reviews: 0,
    role: "Product Manager at Microsoft | Ex SDE at Microsoft | 1000+ Trained | Python | Tableau | ML",
    experience: "2 Years",
    sessions: "1 Session",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 500, price: 500 },
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 1000 },
    ],
  },
  {
    name: "Nitish Palaparti",
    rating: 4.8,
    reviews: 5,
    role: "Sr. Product Manager at Microsoft | IIM Ahmedabad | IIT Madras | Ex Practo, EXL, Dell",
    experience: "14 Years",
    sessions: "9 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1499, price: 999 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 499, price: 149 },
    ],
  },
  {
    name: "Shubham Roy",
    rating: 5.0,
    reviews: 5,
    role: "Product Manager @ Microsoft Bing | MBA IIM Kozhikode '23 | I can help you crack PM roles | Engineer | Ex-Accenture",
    experience: "4 Years",
    sessions: "11 Sessions",
    attendance: "92%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "30 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 250 },
    ],
  },
  {
    name: "Tezan Sahu",
    rating: 0,
    reviews: 0,
    role: "Data & Applied Scientist 2 @Microsoft | Co-Author of 'The Vision Debugged' | Amazon #1 Best Selling Author | IIT...",
    experience: "3 Years",
    sessions: "0 Sessions",
    attendance: "0%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [{ title: "Ask a Query", subtitle: "Query", originalPrice: 199, price: 99 }],
  },
  {
    name: "Shantanu Desai",
    rating: 5.0,
    reviews: 2,
    role: "Senior Software Engineer @Microsoft | MTech @NIT Warangal | Ex-CISCO",
    experience: "5 Years",
    sessions: "13 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      {
        title: "GATE 2026 Preparation Strategy",
        subtitle: "Resource",
        originalPrice: 500,
        price: 100,
      },
      {
        title: "GATE 2026 Preparation Strategy",
        subtitle: "Resource",
        originalPrice: 500,
        price: 100,
      },
    ],
  },
  {
    name: "Nitish Palaparti",
    rating: 4.8,
    reviews: 5,
    role: "Sr. Product Manager at Microsoft | IIM Ahmedabad | IIT Madras | Ex Practo, EXL, Dell",
    experience: "14 Years",
    sessions: "9 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "60 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1399, price: 999 },
      { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 499, price: 149 },
    ],
  },
  {
    name: "Shubham Roy",
    rating: 5.0,
    reviews: 5,
    role: "Product Manager @ Microsoft Bing | MBA IIM Kozhikode '23 | I can help you crack PM roles | Engineer | Ex-Accenture",
    experience: "4 Years",
    sessions: "11 Sessions",
    attendance: "92%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      { title: "30 min Mentor Meet", subtitle: "1:1 Call", originalPrice: 1000, price: 250 },
    ],
  },
  {
    name: "Tezan Sahu",
    rating: 0,
    reviews: 0,
    role: "Data & Applied Scientist 2 @Microsoft | Co-Author of 'The Vision Debugged' | Amazon #1 Best Selling Author | IIT...",
    experience: "3 Years",
    sessions: "0 Sessions",
    attendance: "0%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [{ title: "Ask a Query", subtitle: "Query", originalPrice: 199, price: 99 }],
  },
  {
    name: "Shantanu Desai",
    rating: 5.0,
    reviews: 2,
    role: "Senior Software Engineer @Microsoft | MTech @NIT Warangal | Ex-CISCO",
    experience: "5 Years",
    sessions: "13 Sessions",
    attendance: "100%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    sessionsList: [
      {
        title: "GATE 2026 Preparation Strategy",
        subtitle: "Resource",
        originalPrice: 500,
        price: 100,
      },
      {
        title: "GATE 2026 Preparation Strategy",
        subtitle: "Resource",
        originalPrice: 500,
        price: 100,
      },
    ],
  },
];

function makeMentors(companyName: string): Mentor[] {
  return [
    {
      name: "Arjun Sharma",
      rating: 4.9,
      reviews: 24,
      role: `Lead Software Engineer at ${companyName} | Distributed Systems & High Scale Backend Expert`,
      experience: "8 Years",
      sessions: "42 Sessions",
      attendance: "100%",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
      sessionsList: [
        { title: "Quick Call", subtitle: "1:1 Call", originalPrice: 600, price: 300 },
        { title: "System Design Review", subtitle: "1:1 Call", originalPrice: 1200, price: 800 },
      ],
    },
    {
      name: "Shreya Patel",
      rating: 4.8,
      reviews: 15,
      role: `Senior Product Engineer at ${companyName} | Frontend Architect & UI Performance Specialist`,
      experience: "5 Years",
      sessions: "28 Sessions",
      attendance: "98%",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
      sessionsList: [
        { title: "Resume review", subtitle: "1:1 Call", originalPrice: 700, price: 400 },
        {
          title: "Frontend Mock Interview",
          subtitle: "60 Min Meet",
          originalPrice: 1500,
          price: 900,
        },
      ],
    },
  ];
}

function CompanyMentorsPage() {
  const navigate = useNavigate();
  const { companyId } = Route.useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const companyInfo = companyList.find((c) => c.id === companyId) ?? {
    id: companyId,
    name: companyId.charAt(0).toUpperCase() + companyId.slice(1),
    domain: `${companyId}.com`,
    color: "#635bff",
  };

  const allMentors =
    companyInfo.id === "amazon"
      ? amazonMentors
      : companyInfo.id === "google"
        ? googleMentors
        : companyInfo.id === "microsoft"
          ? microsoftMentors
          : makeMentors(companyInfo.name);

  const mentors = allMentors.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const book = (name: string, session: string) =>
    toast.success(`Booking "${session}" with ${name}!`);

  const col = companyInfo.color;

  return (
    <SiteShell>
      <div className="min-h-screen pb-24 text-foreground">
        {/* ── Back + Hero ─────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            to="/mentorship-program"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Companies
          </Link>

          {/* Hero card */}
          <div
            className="relative mb-12 overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-8 md:p-10"
            style={{
              borderColor: `${col}25`,
              background: `linear-gradient(135deg, ${col}08 0%, transparent 60%)`,
            }}
          >
            <div
              className="absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl opacity-15"
              style={{ background: col }}
            />

            <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
              {/* Text */}
              <div className="space-y-3 text-center md:text-left">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                  style={{ borderColor: `${col}40`, background: `${col}15`, color: col }}
                >
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  {companyInfo.name} Mentor Hub
                </span>
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {companyInfo.name} <span style={{ color: col }}>Mentors</span>
                </h1>
                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                  Book 1:1 sessions with senior {companyInfo.name} engineers, designers & managers.
                  Get roadmaps, resume reviews, and direct referrals.
                </p>
              </div>

              {/* Logo */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-border/30 bg-white p-4 shadow-xl">
                <img
                  src={`https://logo.clearbit.com/${companyInfo.domain}`}
                  alt={companyInfo.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://www.google.com/s2/favicons?sz=128&domain=${companyInfo.domain}`;
                  }}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Search + Filters + List ──────────────────────── */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, role, or skill…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/80 bg-card/60 py-3.5 pl-12 pr-6 text-sm outline-none shadow-md backdrop-blur-xl"
            />
          </div>

          {/* Filters */}
          <div className="mb-10 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            <button className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/40 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground">
              <Filter className="h-3.5 w-3.5" /> Filters
              <span
                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: col }}
              >
                1
              </span>
            </button>
            <button className="rounded-full border border-border/80 bg-card/40 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground">
              Top Mentor
            </button>
            <button className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/40 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground">
              Sort By <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mentor cards */}
          <div className="space-y-8">
            {mentors.length > 0 ? (
              mentors.map((m, i) => {
                const profileHref =
                  companyInfo.id === "amazon" && m.name === "Sourav Aggarwal"
                    ? "/mentorship-program/amazon/sourav-aggarwal"
                    : companyInfo.id === "amazon" && m.name === "Purvabh Surana"
                      ? "/mentorship-program/amazon/purvabh-surana"
                      : companyInfo.id === "google" && m.name === "Mehul Sampath"
                        ? "/mentorship-program/google/mehul-sampath"
                      : null;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (profileHref) {
                        navigate({ to: profileHref });
                      }
                    }}
                    className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-card/30 p-6 transition-all duration-300 hover:shadow-2xl sm:p-8 ${
                      profileHref ? "cursor-pointer" : ""
                    }`}
                  >
                    {/* glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ boxShadow: `inset 0 0 60px ${col}10` }}
                    />

                    {/* Profile row */}
                    <div className="relative flex flex-col items-start gap-6 md:flex-row">
                      {/* Avatar */}
                      <div className="relative mx-auto shrink-0 md:mx-0">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="h-24 w-24 rounded-2xl border border-border/40 object-cover shadow-md sm:h-28 sm:w-28"
                        />
                        <span
                          className="absolute -bottom-2 -right-2 rounded-full border-2 border-card p-1 text-white shadow"
                          style={{ background: col }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      {/* Details */}
                      <div className="w-full flex-1 space-y-3 text-center md:text-left">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            {profileHref ? (
                              <Link
                                to={profileHref}
                                onClick={(event) => event.stopPropagation()}
                                className="font-display text-xl font-bold text-foreground transition-colors hover:text-primary sm:text-2xl flex items-center justify-center md:justify-start gap-2"
                              >
                                {m.hasTrophy && (
                                  <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/20 shrink-0" />
                                )}
                                {m.name}
                              </Link>
                            ) : (
                              <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl flex items-center justify-center md:justify-start gap-2">
                                {m.hasTrophy && (
                                  <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/20 shrink-0" />
                                )}
                                {m.name}
                              </h3>
                            )}
                            {m.rating && m.rating > 0 ? (
                              <div className="mt-1 flex items-center justify-center gap-1 text-sm md:justify-start">
                                <Star className="h-4 w-4 fill-current" style={{ color: col }} />
                                <span className="font-bold" style={{ color: col }}>
                                  {m.rating}
                                </span>
                                <span className="text-muted-foreground">
                                  ({m.reviews} {m.reviews === 1 ? "Review" : "Reviews"})
                                </span>
                              </div>
                            ) : null}
                          </div>
                          {/* Company badge */}
                          <div className="mx-auto flex h-10 w-24 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-white p-1.5 shadow sm:mx-0">
                            <img
                              src={`https://logo.clearbit.com/${companyInfo.domain}`}
                              alt={companyInfo.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://www.google.com/s2/favicons?sz=64&domain=${companyInfo.domain}`;
                              }}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground sm:text-base">{m.role}</p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-3 pt-1 text-xs text-muted-foreground md:justify-start">
                          {[
                            {
                              icon: Briefcase,
                              val: m.experience ? m.experience + " Experience" : null,
                            },
                            { icon: Users, val: m.sessions || null },
                            {
                              icon: CheckCircle2,
                              val: m.attendance ? m.attendance + " Avg. Attendance" : null,
                              green: true,
                            },
                          ]
                            .filter((item) => item.val !== null)
                            .map(({ icon: Icon, val, green }) => (
                              <span
                                key={val}
                                className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-card/60 px-3 py-1.5"
                              >
                                <Icon
                                  className="h-3.5 w-3.5"
                                  style={green ? { color: "#10b981" } : { color: col }}
                                />
                                {val}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Session cards */}
                    <div className="mt-7 grid grid-cols-1 gap-4 border-t border-border/40 pt-6 sm:grid-cols-2 md:grid-cols-3">
                      {m.sessionsList.map((s, si) => (
                        <div
                          key={si}
                          onClick={(event) => {
                            event.stopPropagation();
                            book(m.name, s.title);
                          }}
                          className="group/s flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 bg-background/40 p-4 transition-all hover:bg-card/30"
                          style={{ hoverBorderColor: `${col}50` }}
                        >
                          <div>
                            <div
                              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
                              style={{ color: col }}
                            >
                              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                              {s.subtitle}
                            </div>
                            <h4 className="mt-1 font-display text-sm font-bold text-foreground sm:text-base">
                              {s.title}
                            </h4>
                          </div>
                          <div className="text-right">
                            {s.originalPrice && s.originalPrice !== s.price && (
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{s.originalPrice}
                              </div>
                            )}
                            <div
                              className={`mt-1 rounded-lg border px-2.5 py-1 text-xs font-bold ${
                                s.price === 0
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                  : ""
                              }`}
                              style={
                                s.price === 0
                                  ? {}
                                  : { background: `${col}15`, borderColor: `${col}30`, color: col }
                              }
                            >
                              {s.price === 0 ? "Free" : `₹${s.price}`}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          if (profileHref) {
                            navigate({ to: profileHref });
                            return;
                          }

                          toast.success(`Viewing all availability for ${m.name}`);
                        }}
                        className="flex min-h-[72px] items-center justify-center rounded-2xl border border-dashed border-border/80 bg-background/20 text-sm font-semibold text-muted-foreground transition-all hover:bg-card/40 hover:text-foreground"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-card/20 py-16 text-center">
                <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="font-bold text-lg">No mentors found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
