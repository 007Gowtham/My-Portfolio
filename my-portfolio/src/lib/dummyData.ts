export const dummyProfile = {
  id: 1,
  name: "Gowtham S D",
  about:
    "I’m a passionate and forward-thinking Computer Science student at Sri Krishna College of Technology, deeply driven by the desire to turn innovative ideas into meaningful digital experiences. My approach to development combines creativity with analytical thinking — designing solutions that are not only functional but also intuitive and impactful. I thrive on transforming complex challenges into elegant, efficient systems through continuous learning and experimentation. With a strong foundation in modern web technologies and a growing enthusiasm for scalable, real-world applications, I aim to build software that makes technology feel seamless, human, and intelligent.",
  image: "/about/profile.svg",
  skills: [
    // Programming Languages
    { name: "C" },
    { name: "C++" },
    { name: "Java" },
    { name: "Python" },
    { name: "JavaScript" },
    { name: "TypeScript" },

    // Frontend
    { name: "React" },
    { name: "Next.js" },
    { name: "HTML5" },
    { name: "CSS3" },
    { name: "Tailwind CSS" },
    { name: "Redux" },

    // Backend
    { name: "Node.js" },
    { name: "Express.js" },
    { name: "Django" },
    { name: "RESTful APIs" },
    { name: "MongoDB" },
    { name: "MySQL" },

    // Design & Tools
    { name: "Figma" },
    { name: "Git & GitHub" },
    { name: "VS Code" },
    { name: "Postman" },
    { name: "Firebase" }
  ],
  internships: [
    {
      company: "Fluentx (Startup)",
      year: "2024 – 2025",
      role: "Frontend Developer Intern",
      about:
        "Collaborated with a small, fast-paced startup team to design and develop modern, responsive web applications. Contributed to enhancing user interaction and visual consistency while ensuring code scalability and performance. Gained valuable exposure to real-world project workflows, agile development, and client-oriented design thinking."
    }
  ]
};


export const dummyTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    linkedin_link: "https://linkedin.com/in/sarah-johnson",
    description: "Gowtham delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach made our vision come to life.",
    image: null,
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    linkedin_link: "https://linkedin.com/in/michael-chen",
    description: "Working with Gowtham was a pleasure. He's professional, responsive, and his technical skills are outstanding. Highly recommended!",
    image: null,
    rating: 4
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    linkedin_link: "https://linkedin.com/in/emily-rodriguez",
    description: "The UI/UX design Gowtham created for our app was exactly what we needed. His understanding of user experience is remarkable.",
    image: null,
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    linkedin_link: "https://linkedin.com/in/david-kim",
    description: "Gowtham's development skills are top-notch. He delivered our project on time and with excellent quality. Will definitely work with him again.",
    image: null,
    rating: 4
  },
  {
    id: 5,
    name: "Lisa Wang",
    linkedin_link: "https://linkedin.com/in/lisa-wang",
    description: "Amazing work! Gowtham transformed our ideas into a beautiful, functional website. His communication throughout the project was excellent.",
    image: null,
    rating: 5
  },
  {
    id: 6,
    name: "Alex Thompson",
    linkedin_link: "https://linkedin.com/in/alex-thompson",
    description: "Professional, creative, and reliable. Gowtham delivered exactly what we asked for and more. Highly satisfied with the results.",
    image: null,
    rating: 4
  }
];


export const dummyProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    cover_image: "/project/p1.svg",
    github_link: "https://github.com/example/ecommerce",
    live_link: "https://example-ecommerce.com",
    tools: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Stripe" }
    ],
    values: [
      { name: "Responsive Design" },
      { name: "SEO Optimized" },
      { name: "Fast Loading" }
    ]
  },
  {
    id: 2,
    name: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
    cover_image: "/project/p2.svg",
    github_link: "https://github.com/example/taskmanager",
    live_link: "https://example-taskmanager.com",
    tools: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Socket.io" },
      { name: "MongoDB" }
    ],
    values: [
      { name: "Real-time Updates" },
      { name: "Team Collaboration" },
      { name: "Mobile Friendly" }
    ]
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects, skills, and professional experience with smooth animations.",
    cover_image: "/project/p3.svg",
    github_link: "https://github.com/example/portfolio",
    live_link: "https://example-portfolio.com",
    tools: [
      { name: "Next.js" },
      { name: "Framer Motion" },
      { name: "Tailwind CSS" }
    ],
    values: [
      { name: "Modern Design" },
      { name: "Smooth Animations" },
      { name: "Performance Optimized" }
    ]
  },
  {
    id: 4,
    name: "Weather Dashboard",
    description: "A comprehensive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    cover_image: "/project/p4.svg",
    github_link: "https://github.com/example/weather",
    live_link: "https://example-weather.com",
    tools: [
      { name: "Vue.js" },
      { name: "Chart.js" },
      { name: "OpenWeather API" }
    ],
    values: [
      { name: "Real-time Data" },
      { name: "Interactive Maps" },
      { name: "Analytics Dashboard" }
    ]
  }
];

export const dummyServices = [
  {
    id: 1,
    name: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Friendly",
      "Cross-browser Compatibility"
    ],
    icon: "/service/cover1.svg"
  },
  {
    id: 2,
    name: "UI/UX Design",
    description: "User-centered design solutions for digital products",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems"
    ],
    icon: "/service/cover2.svg"
  },
  {
    id: 3,
    name: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    features: [
      "iOS Development",
      "Android Development",
      "React Native",
      "App Store Optimization"
    ],
    icon: "/service/SVG.svg"
  }
];

export const dummyCodingPlatforms = [
  {
    id: 1,
    name: "LeetCode",
    link: "https://leetcode.com/gowtham",
    problems_solved: 150,
    rank: "Top 10%",
    icon: "/programming/Leetcode.svg"
  },
  {
    id: 2,
    name: "HackerRank",
    link: "https://hackerrank.com/gowtham",
    problems_solved: 200,
    rank: "5 Star",
    icon: "/programming/Frame.svg"
  },
  {
    id: 3,
    name: "CodeChef",
    link: "https://codechef.com/users/gowtham",
    problems_solved: 100,
    rank: "3 Star",
    icon: "/programming/geeks.svg"
  }
];
