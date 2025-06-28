import myPhoto from "../assets/WhatsApp Image 2025-06-26 at 12.32.06 AM.jpeg";
import companyLogo from "../assets/WhatsApp Image 2025-06-26 at 12.40.32 AM.jpeg";

export const profileData = {
  company: {
    name: "ELITE GARMENTS INDUSTRIES LTD.",
    logo: companyLogo,
    coverPhoto:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop&crop=center",
  },
  employee: {
    fullName: "MD. SHAHIDUZZAMAN",
    designation: "Executive Director",
    department: "Corporate Strategy & Leadership",
    employeeId: "EG-2024-ED001",
    profilePhoto: myPhoto,
    verified: true,
    bloodGroup: "O+",
    bio: "Passionate business development professional with 8+ years of experience in B2B sales, client relationship management, and strategic partnerships. Specialized in fintech and enterprise software solutions.",
  },
  contact: {
    emails: {
      personal: "sarah.johnson@gmail.com",
      office: "sarah.j@techvibes.com",
    },
    phones: {
      personal: "+1 (555) 123-4567",
      office: "+1 (555) 890-1234",
    },
    whatsapp: {
      personal: "+1 (555) 123-4567",
      business: "+1 (555) 999-8888",
    },
  },
  locations: [
    {
      type: "Head Office",
      address: "123 Innovation Drive, Tech Park, Silicon Valley, CA 94043",
    },
    {
      type: "Branch Office",
      address: "456 Business Center, Downtown District, NY 10001",
    },
    {
      type: "Local Address",
      address: "789 Residential Ave, Hometown, CA 94022",
    },
  ],
  social: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/sarah-johnson",
      icon: "💼",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/sarah_techvibes",
      icon: "🐦",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/sarah.biz",
      icon: "📸",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/sarah.johnson",
      icon: "📘",
    },
  ],
  business: {
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    services: [
      "Enterprise Software Solutions",
      "Digital Transformation Consulting",
      "Cloud Infrastructure Services",
      "Cybersecurity Solutions",
      "Data Analytics & AI",
    ],
  },
};
