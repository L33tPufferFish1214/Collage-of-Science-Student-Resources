export type CategoryStyle = {
  accent: string;
  background: string;
  border: string;
  text: string;
};

const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  accent: "#6F7479",
  background: "#F1F2F2",
  border: "#D9DCDE",
  text: "#50565A"
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Academic Help": {
    accent: "#9E6A6C",
    background: "#F7EEEE",
    border: "#EAD6D7",
    text: "#684448"
  },
  "Scholarships & Financial Aid": {
    accent: "#8C8068",
    background: "#F5F1E8",
    border: "#E2DAC9",
    text: "#625946"
  },
  "Research & Internships": {
    accent: "#708E99",
    background: "#EEF3F5",
    border: "#D6E1E5",
    text: "#4F6871"
  },
  "Advising & Course Planning": {
    accent: "#7A8188",
    background: "#F1F3F4",
    border: "#D8DDE0",
    text: "#4F575E"
  },
  "Wellness & Mental Health": {
    accent: "#7D8F83",
    background: "#F0F4EF",
    border: "#D7E1D8",
    text: "#56685A"
  },
  "Community & Student Orgs": {
    accent: "#8B7F89",
    background: "#F4F0F3",
    border: "#DED6DD",
    text: "#635A62"
  },
  "Career Development": {
    accent: "#697985",
    background: "#EEF2F4",
    border: "#D5DEE3",
    text: "#4A5861"
  },
  "Housing & Campus Life": {
    accent: "#82796E",
    background: "#F2F0EC",
    border: "#DBD5CE",
    text: "#5F574E"
  },
  "Emergency & Safety": {
    accent: "#8A6865",
    background: "#F6EEEE",
    border: "#E2D1CF",
    text: "#654B48"
  },
  "Department Hubs": DEFAULT_CATEGORY_STYLE
};

export const getCategoryStyle = (category: string) =>
  CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
