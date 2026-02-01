// types/profile.ts

export interface SubTitle {
  name: string;
  url: string;
}

export interface CompanyInfo {
  name: string;
  url: string;
}

export interface ExternalLink {
  name: string;
  url: string;
  description: string;
  isExternal?: boolean;
  category?: "social" | "work" | "hobby" | "portfolio" | "career";
}

export interface ProjectInfo {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  status: "active" | "completed" | "archived";
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string[];
  details: string[];
  technologies?: string[];
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  social?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface PageConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subTitle: SubTitle;
  company?: CompanyInfo;
  profileImage: string;
  biography: string[];
  wishToDo: string[];
  expertise: string[];
  relatedLinks: ExternalLink[];
  contactInfo?: ContactInfo;
  pageType: "hobby" | "career";
  projects?: ProjectInfo[];
  experience?: WorkExperience[];
}
