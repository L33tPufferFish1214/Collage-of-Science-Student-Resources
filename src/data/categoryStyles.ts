export type CategoryStyle = {
  accent: string;
  background: string;
  border: string;
  text: string;
};

const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  accent: "#5E6870",
  background: "#ECEFF1",
  border: "#C9D0D5",
  text: "#3F484F"
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Academic Help": {
    accent: "#A5555A",
    background: "#F6E5E6",
    border: "#E5C4C7",
    text: "#633338"
  },
  "Scholarships & Financial Aid": {
    accent: "#91815A",
    background: "#F3EBD9",
    border: "#DCCDAA",
    text: "#5C4E2E"
  },
  "Research & Internships": {
    accent: "#5F8A9B",
    background: "#E7F0F3",
    border: "#C5DCE4",
    text: "#385D6B"
  },
  "Advising & Course Planning": {
    accent: "#697782",
    background: "#ECEFF2",
    border: "#CBD3D9",
    text: "#3F4E58"
  },
  "Wellness & Mental Health": {
    accent: "#6F8F76",
    background: "#EAF3E9",
    border: "#C8DDCA",
    text: "#415E47"
  },
  "Community & Student Orgs": {
    accent: "#8B6F88",
    background: "#F2E8F0",
    border: "#D9C5D5",
    text: "#5B4658"
  },
  "Career Development": {
    accent: "#5F788A",
    background: "#E8F0F4",
    border: "#C6D8E2",
    text: "#3B5363"
  },
  "Housing & Campus Life": {
    accent: "#85735F",
    background: "#F1EBE3",
    border: "#D8C7B4",
    text: "#5B4B3A"
  },
  "Emergency & Safety": {
    accent: "#985D59",
    background: "#F5E5E3",
    border: "#DFC0BD",
    text: "#623A37"
  },
  "Student Access & Support": {
    accent: "#5F8374",
    background: "#E7F1ED",
    border: "#C4DBD2",
    text: "#38594C"
  },
  "Department Hubs": DEFAULT_CATEGORY_STYLE
};

export const getCategoryStyle = (category: string) =>
  CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
