export interface Skill {
  name: string
  type: "primary" | "secondary" | "accent" | "ghost" | "info"
}

export interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: Skill[]
  type: "featured" | "showcase"
  demoUrl?: string
  sourceUrl?: string
}

export interface TimelineEntry {
  date: string
  title: string
  description: string
  completed: boolean
}

export interface Testimonial {
  id: number
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar: string
  }
}

export interface Stats {
  projects: {
    count: string
    increase?: string
  }
  experience: {
    years: string
  }
  clients: {
    count: string
  }
}

export interface SocialLinks {
  github: string
  linkedin: string
  twitter: string
}

export interface ProfileData {
  name: string
  role: string
  avatar: string
  status: {
    available: boolean
    remote: boolean
  }
  education?: {
    degree: string
    school: string
    year: string
  }[]
  certifications?: {
    name: string
    issuer: string
    year: string
  }[]
  bio?: string
  location?: string
  email?: string
}

export interface Activity {
  id: number
  title: string
  status: "completed" | "in-progress" | "pending"
}
