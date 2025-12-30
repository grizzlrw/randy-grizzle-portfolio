import { ExperienceData } from "../types/experience";
import CCS_Launch_Home from "../assets/images/CCS_Launch_Home.png";
import WTCHPHome from "../assets/images/WTCHP_Home.png";
import CDCLogo from "../assets/images/cdc_logo.svg";
import CACI from "../assets/images/CACI_International_logo.svg";

export const experiences: ExperienceData[] = [
  {
    images: [
      { image: CCS_Launch_Home, alt: "CCS Launch Home" }
    ],
    title: "CCS Health",
    subtitle: "Senior Frontend Engineer",
    impacts: [
      { label: "Monorepo Architecture", color: "primary" },
      { label: "WCAG 2.1 AA Compliance", color: "success" },
      { label: "VPAT", color: "success" },
      { label: "Design System", color: "info" },
      { label: "CI/CD Integration", color: "info" },
    ],
    contributions: [
      "Developed a monorepo solution using Vue and TypeScript, standardizing three care coordination applications through an internal shared component library and centralized state management integrated with RESTful API services. This architecture enabled streamlined user workflows for clients and care teams while supporting secure handling of HIPAA-regulated data.",
      "Integrated support for multilingual user interfaces by developing a scalable internationalization architecture with localized i18n resources, browser-based language detection for sensible defaults, user-controlled language switching, and graceful fallback handling.",
      "Led WCAG 2.1 Level AA and Section 508 compliance development through comprehensive accessibility testing including screen reader validation with JAWS and NVDA and direct collaboration with visually impaired users, achieving independent VPAT with full or partial support for all features.",
      "Improved system scalability by collaborating with the UI/UX designer to develop a shared theming system based on Adobe XD designs. This system drove consistent branding and styling across multiple applications while allowing for flexible customization to meet specific program needs.",
      "Partnered with QA engineers to define application behaviors and acceptance criteria, enabling the development of Cypress end-to-end tests integrated into CI/CD pipelines to validate critical user workflows across applications.",
      "Collaborated with project managers through Agile development cycles, utilizing CI/CD pipelines to deliver production releases that aligned with business requirements and maintained deployment quality.",
      "Implemented role-based authorization logic for component views and navigation across multiple care coordination applications.",
    ],
  },
  {
    images: [
      { image: WTCHPHome, alt: "WTCHP Logo" }
    ],
    title: "World Trade Center Health Program",
    subtitle: "Frontend Engineer · Federal Contractor (Maximus / Attain, LLC · Emergint Technologies / CACI)",
    impacts: [
      { label: "38,000+ New Enrollees", color: "primary" },
      { label: "NIOSH Plain Language Award", color: "success" },
    //   { label: "Attain Way Achievement Award", color: "success" },
      { label: "Team Leadership", color: "info" },
      { label: "Section 508 Compliance", color: "info" },
    ],
    contributions: [
      "Modernized the World Trade Center Health Program public website by developing a responsive redesign solution that provided eligibility and coverage information for over 38,000 newly enrolled 9/11 responders and survivors.",
      "Designed and developed the Research Gateway, a portal providing public access to years of NIOSH research projects, to encourage collaboration among researchers and give the public a path to help understand the research driving advancements to 9/11-related health condition coverage and treatment.",
      "Advanced community engagement efforts between researchers and 9/11 responders and survivors by engineering the Research-to-Care registration application to accept participants for events, manage registrations, and provide follow-up communications.",
      "Mentored junior frontend developers and trained them to manage the WTCHP public website, leading the development of the Section-508 compliant Administrative Manual, Member Handbook, and Chart.js plugin for interactive graphs representing WTCHP statistics and health demographics.",
    ],
  },
  {
    images: [
      { image: CACI, alt: "CACI International Logo", isVector: true },
      { image: CDCLogo, alt: "CDC Logo", isVector: true }
    ],
    title: "Division of Compensation Analysis and Support (DCAS)",
    subtitle: "Frontend Engineer · Federal Contractor (Emergint Technologies / CACI, Intl)",
    impacts: [
      { label: "Responsive Design", color: "primary" },
      { label: "Public Portal Development", color: "primary" },
      { label: "Section 508 Compliance", color: "info" },
      { label: "Legacy Modernization", color: "info" },
    ],
    contributions: [
      "Developed a public-facing JavaScript application to address the need for workers to track their petition status independently. Created an intuitive interface that allows users to check the status of petitions relating to their work history, improving transparency and reducing support inquiries.",
      "Designed responsive UI/UX and architecture for the public-facing website, ensuring consistent user experience and optimal performance across all browsing platforms while maintaining federal accessibility standards.",
      "Modernized a legacy ASP Web Forms application using Bootstrap to implement responsive design, improving accessibility and user experience across all device types.",
      "Identified document formatting inconsistencies when uploading to the document management application. Designed a new standardized document header that ensured proper formatting and metadata preservation throughout the document management workflow.",
      "Created and modified Section 508-compliant documents to comply with Web Accessibility Standards, ensuring all digital content met federal accessibility requirements and provided equal access to users with disabilities.",
    ],
  },
];
