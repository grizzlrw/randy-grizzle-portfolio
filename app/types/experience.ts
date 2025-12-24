import { StaticImageData } from "next/image";

export interface ChipData {
  label: string;
  color: "primary" | "success" | "info" | "warning" | "error" | "default";
}

export interface ExperienceImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: StaticImageData | any; // StaticImageData for images, imported SVG component for vectors
  alt: string;
  isVector?: boolean;
}

export interface ExperienceData {
  images: ExperienceImage[];
  title: string;
  subtitle: string;
  impacts: ChipData[];
  contributions: string[];
}
