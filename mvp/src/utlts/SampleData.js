import myPhoto from "../assets/profile.jpeg";
import companyLogo from "../assets/Elite.png";

export const profileData = {
  company: {
    name: "Elite Garments Industries Ltd.",
    logo: companyLogo,
    coverPhoto:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop&crop=center",
  },
  employee: {
    fullName: "Md. Shahiduzzaman",
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
      personal: "zaman@elite-garments.com",
      office: "zaman@elite-garments.com",
    },
    phones: {
      personal: "+880 1711-540452",
      office: "+880 2 41082171-3",
    },
    whatsapp: {
      personal: "+880 1711-540452",
      business: "+880 1730-357746",
    },
  },
  locations: [
    {
      type: "Head Office",
      address:
        "BTI Landmark (Level-10)\n" +
        "16 Gulshan Avenue,\n" +
        "Dhaka-1212, Bangladesh\n",
    },
    {
      type: "Factory Address",
      address: "Bade Kalmeshwar, Board Bazar,\n" + "Gazipur, Bangladesh\n",
    },
  ],
  social: [
    {
      platform: "LinkedIn",
      url: "",
      icon: "💼",
    },
    {
      platform: "WeChat",
      url: "_Zaman68",
      icon: "🐦",
    },
    // {
    //   platform: "Instagram",
    //   url: "https://instagram.com/sarah.biz",
    //   icon: "📸",
    // },
    // {
    //   platform: "Facebook",
    //   url: "https://facebook.com/sarah.johnson",
    //   icon: "📘",
    // },
    {
      platform: "Website",
      url: "https://elite-garments.com",
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
