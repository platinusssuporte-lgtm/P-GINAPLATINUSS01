export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceCard {
  code: string; // e.g. "ALG 0.1"
  title: string;
  description: string;
  video: string;
}

export interface MethodStep {
  number: string;
  title: string; // "Diagnóstico"
  heading: string; // "1. Diagnóstico"
  description: string;
  image: string;
}

export interface Objection {
  index: string; // "OBJEÇÃO 1"
  quote: string;
  answer: string;
}

export interface Differentiator {
  icon: string; // path to svg
  title: string;
  description: string;
}
