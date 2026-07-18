import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

import Footer from '../footer';
import { Button } from '@/components/sections/ui';

import { Navbar, TopNavbar } from '@/components/sections/navigation';
import HomeImage from '@/assert/home/Image.svg';
import ArrowIcon from '@/assert/project/arrow.svg';
import ezmark1 from '../../assert/project/ezmark/ezmark1.png'
import ezmark2 from '../../assert/project/ezmark/e1.png'
import multiplyerCover from '../../assert/project/multiplyer/cover.png'
import multiplyerGroup3 from '../../assert/project/multiplyer/Group 3.png'
import multiplyerGroup4 from '../../assert/project/multiplyer/Group 4.png'
import docsyncCover from '../../assert/project/collab/cover.png'
import docsyncC1 from '../../assert/project/collab/c1.png'
import docsyncC2 from '../../assert/project/collab/c2.png'
import ezmarkCover from '../../assert/project/ezmark/emark cover.png'
import writez1 from '../../assert/project/writez/1.png'
import writez2 from '../../assert/project/writez/2.png'
import writez3 from '../../assert/project/writez/3.png'
// TypeScript interfaces
interface ProjectButton {
  id: number;
  text: string;
  icon: string;
  type: 'primary' | 'secondary';
  className: string;
}

interface ProjectDetail {
  id: number;
  label: string;
  value: string;
}

interface ProjectImage {
  id: number;
  src: StaticImageData | string;
  alt: string;
  mobileView?: boolean;
}

interface ProjectContent {
  id: number;
  text: string;
  highlight?: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  buttons: ProjectButton[];
  siteUrl?: string;
  details: ProjectDetail[];
  images: ProjectImage[];
  content: ProjectContent[];
  conclusion: string;
}

// Projects data array - maintaining your original structure
const projectsData: ProjectData[] = [

  {
    id: 1,
    title: "EzMark",
    siteUrl: "https://github.com/Aswin-Hariram/EzMark",
    description:
      "EzMark is a React Native attendance management system with admin, teacher, and student workflows using OTP and facial recognition for secure validation.",
    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className:
          "box-border text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className:
          "box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],
    details: [
      {
        id: 1,
        label: "Services",
        value: "React Native Development, Authentication, AWS Integration"
      },
      {
        id: 2,
        label: "Tools",
        value: "React Native, Firestore, AWS Rekognition, AWS S3"
      },
      {
        id: 3,
        label: "Value",
        value: "Secure attendance, Face recognition, OTP verification"
      },
      {
        id: 4,
        label: "Timeline",
        value: "6 weeks"
      }
    ],
    images: [
      { id: 1, src: ezmarkCover, alt: "EzMark Cover", mobileView: false },
      { id: 2, src: ezmark1, alt: "EzMark Intro", mobileView: true },
      { id: 3, src: ezmark2, alt: "EzMark Student", mobileView: false },
    ],
    content: [
      {
        id: 1,
        text: "EzMark is a complete attendance automation solution that replaces traditional manual systems with OTP verification and facial recognition.",
        highlight: "EzMark"
      },
      {
        id: 2,
        text: "Admins can manage teachers and students, teachers create OTP-based attendance requests, and students authenticate using Face ID and secure OTP entry."
      },
      {
        id: 3,
        text: "The app uses AWS Rekognition for high-accuracy face matching and Firestore for real-time data storage."
      }
    ],
    conclusion:
      "EzMark modernizes attendance systems using biometrics and cloud storage. With its secure face recognition and OTP flow, it ensures authentic and real-time attendance validation."
  },

  {
    id: 4,
    title: "ClashCode",
    siteUrl: "https://clashcode-dsa-multiplayer.netlify.app",
    description:
      "A team-based competitive programming platform where users battle in real time, submit code that is judged asynchronously in a Dockerized sandbox, and watch verdicts and leaderboards update live.",

    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className:
          "box-border text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className:
          "box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],

    details: [
      {
        id: 1,
        label: "Services",
        value: "Full-Stack Development, Real-Time WebSockets"
      },
      {
        id: 2,
        label: "Tools",
        value: "Spring Boot, React, Next.js, Docker, PostgreSQL, AWS"
      },
      {
        id: 3,
        label: "Value",
        value: "Real-time multiplayer coding, Async judging, Docker sandboxing"
      },
      {
        id: 4,
        label: "Timeline",
        value: "4 weeks"
      }
    ],

    images: [
      { id: 1, src: multiplyerCover, alt: "ClashCode Cover", mobileView: false },
      { id: 2, src: multiplyerGroup3, alt: "ClashCode UI 1", mobileView: false },
      { id: 3, src: multiplyerGroup4, alt: "ClashCode UI 2", mobileView: false },
    ],

    content: [
      {
        id: 1,
        text:
          "ClashCode lets users join a room, form teams, and solve DSA problems against each other in real-time.",
        highlight: "ClashCode"
      },
      {
        id: 2,
        text:
          "The platform uses an async, queue-based judging pipeline and pushes the result back to the browser the moment it's ready — no polling required."
      },
      {
        id: 3,
        text:
          "It features Dockerized sandbox execution per submission and real-time verdict delivery over native Spring WebSocket/STOMP."
      }
    ],

    conclusion:
      "ClashCode successfully demonstrates a scalable architecture for real-time competitive programming, combining robust backend judging with a responsive real-time frontend."
  },

  {
    id: 5,
    title: "DocSync",
    siteUrl: "https://github.com/yourusername/docsync.git",
    description:
      "A full-stack, production-grade collaborative document editor inspired by Google Docs. Multiple users edit the same document simultaneously — conflict-free, in real time, with live cursors.",

    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className:
          "box-border text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className:
          "box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],

    details: [
      {
        id: 1,
        label: "Services",
        value: "Full-Stack Development, Real-Time Collaboration"
      },
      {
        id: 2,
        label: "Tools",
        value: "Next.js, React, Yjs, TipTap, Node.js, PostgreSQL"
      },
      {
        id: 3,
        label: "Value",
        value: "Live Collaboration, Live Cursors, Rich Text Editing"
      },
      {
        id: 4,
        label: "Timeline",
        value: "4 weeks"
      }
    ],

    images: [
      { id: 1, src: docsyncCover, alt: "DocSync Cover", mobileView: false },
      { id: 2, src: docsyncC1, alt: "DocSync UI 1", mobileView: false },
      { id: 3, src: docsyncC2, alt: "DocSync UI 2", mobileView: false },
    ],

    content: [
      {
        id: 1,
        text:
          "DocSync is a real-time collaborative document editor that allows multiple users to edit simultaneously with zero conflicts.",
        highlight: "DocSync"
      },
      {
        id: 2,
        text:
          "It uses Yjs CRDT for conflict-free real-time synchronization and a hybrid Next.js architecture for fast loading and SEO optimization."
      },
      {
        id: 3,
        text:
          "Features include live cursors, rich text editing via TipTap, document sharing, and JWT-based authentication with role-based access."
      }
    ],

    conclusion:
      "DocSync demonstrates the power of CRDTs for collaborative applications, combining a responsive Next.js frontend with a robust Node.js and WebSocket backend."
  },

  {
    id: 2,
    title: "Writezy",
    siteUrl: "https://github.com/Aswin-Hariram/Writezy-Mobile-App",
    description:
      "Writezy is an AI-powered web application that allows users to generate, refine, and edit content effortlessly. It helps users brainstorm ideas, write essays, and improve their writing with intelligent AI assistance.",

    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className:
          "box-border text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className:
          "box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],

    details: [
      {
        id: 1,
        label: "Services",
        value: "Full-Stack Development, AI Integration"
      },
      {
        id: 2,
        label: "Tools",
        value: "React, JavaScript, CSS, OpenAI API, Vite, Netlify"
      },
      {
        id: 3,
        label: "Value",
        value: "AI content generator, AI-powered editing, real-time text suggestions"
      },
      {
        id: 4,
        label: "Timeline",
        value: "1 week"
      }
    ],

    images: [
      { id: 1, src: writez1, alt: "Writezy Dashboard", mobileView: true },
      { id: 2, src: writez2, alt: "Content Editor", mobileView: true },
      { id: 3, src: writez3, alt: "Writezy Extra", mobileView: true },
    ],

    content: [
      {
        id: 1,
        text:
          "Writezy allows users to generate high-quality content instantly using AI-powered text generation models.",
        highlight: "Writezy"
      },
      {
        id: 2,
        text:
          "The interface provides a clean and distraction-free editor where users can refine and improve their content with intelligent AI suggestions."
      },
      {
        id: 3,
        text:
          "The platform is built with React and optimized using Vite for fast performance and seamless user experience."
      }
    ],

    conclusion:
      "Writezy simplifies content creation by combining modern web technology with AI-powered writing tools, making it easy for users to brainstorm, write, and edit quickly and efficiently."
  }

];

// Enhanced 404 Error Component - maintaining your original color scheme
const NotFoundPage: React.FC = () => (
  <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#F0F8FF]/90">
    {/* Your original grain overlay */}
    <Image
      src={HomeImage}
      alt="grain texture"
      fill
      className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0"
    />    <div className="relative z-10 text-center space-y-6 px-4">
      <h1 className="text-9xl font-bold text-gray-300 animate-pulse">404</h1>
      <h2 className="text-4xl font-bold text-gray-700">Project Not Found</h2>
      <p className="text-xl text-gray-600 max-w-md mx-auto">
        The project you are looking for does not exist. Please check the URL or go back to the projects page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.history.back()}
          className="box-border  text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          Go Back
        </button>
        <Link
          href='/projects'
          className="box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          View All Projects
        </Link>
      </div>
    </div>
  </div>
);


interface DetailItemProps {
  detail: ProjectDetail;
}

interface ProjectImageProps {
  image: ProjectImage;
}

interface ContentSectionProps {
  content: ProjectContent[];
}

interface ProjectCardProps {
  id: number;
  title: string;
  img: StaticImageData | string;
  description: string;
}


// Enhanced Detail Item Component - maintaining your style but adding subtle hover
const DetailItem: React.FC<DetailItemProps> = ({ detail }) => (
  <div className="grid gap-1 p-4  font-inter ">
    <div className=" text-lg font-inter text-[#0E1C29]/80">{detail.label}</div>
    <p className="text-gray-700 font-inter text-md">{detail.value}</p>
  </div>
);

// Enhanced Project Image Component
const ProjectImage: React.FC<ProjectImageProps> = ({ image }) => (
  <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className={`relative custom-card p-4 rounded-xl ${image.mobileView ? "w-full max-w-[200px] xs:max-w-[220px] sm:max-w-[280px] md:max-w-sm lg:max-w-md xl:max-w-md mx-auto" : "w-full"}`}>
    <Image
      src={image.src}
      width={1400}
      height={1400}
      alt={image.alt}
      className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
    />
  </motion.div>
);

// Enhanced Content Section Component - maintaining your exact styling
const ContentSection: React.FC<ContentSectionProps> = ({ content }) => (
  <div className="flex  flex-col font-inter gap-10 py-5 text-md w-full px-5 text-[#0E1C29]">
    {content.map((item) => (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        key={item.id}
        className="transition-all font-inter duration-300  rounded-xl "
      >
        {item.highlight ? (
          <span>
            {item.text.split(item.highlight)[0]}
            <span className="font-bold inter-medium text-[#0E1C29]">{item.highlight}</span>
            {item.text.split(item.highlight)[1]}
          </span>
        ) : (
          item.text
        )}
      </motion.div>
    ))}
  </div>
);

// Enhanced Project Card Component - keeping your custom-card class and exact styling
const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, img }) => {
  const router = useRouter();

  return (
    <div
      className="custom-card w-[476px] max-w-full h-[405px] mx-auto flex flex-col items-center bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={() => router.push(`/project/${id}`)}
    >
      <div className="relative shadow-xl rounded-xl sm:rounded-2xl w-[444px] max-w-full h-[322.01px] shrink-0 z-10 overflow-hidden group">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 "
        />
      </div>
      <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
        <h3 className="text-xs xs:text-sm sm:text-base md:text-lg w-full text-[#0E1C29]/50 font-inter transition-colors duration-300 hover:text-[#0E1C29]/80">{title}</h3>
        <h3 className="flex w-full items-start relative justify-end">
          <Image
            src={ArrowIcon}
            alt=""
            width={20}
            height={20}
            className="xs:w-[22px] xs:h-[22px] sm:w-[25px] sm:h-[25px] md:w-[28px] md:h-[28px] lg:w-[30px] lg:h-[30px] absolute right-0 top-0 transition-transform duration-300 hover:translate-x-1 hover:scale-110"
          />
        </h3>
      </div>
    </div>
  );
};

// Main Component - maintaining your exact structure and styling
const ProjectDetails: React.FC = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const projectId = parseInt(id as string, 10);

      if (isNaN(projectId)) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const project = projectsData.find(p => p.id === projectId);

      if (project) {
        setProjectData(project);
        setNotFound(false);
      } else {
        setNotFound(true);
      }

      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen w-full bg-[#F0F8FF]/80">
        {/* Your original grain overlay */}
        <Image
          src={HomeImage}
          alt="grain texture"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0"
        />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#0E1C29]/20 border-t-[#0E1C29] rounded-full animate-spin"></div>
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (notFound || !projectData) {
    return <NotFoundPage />;
  }

  return (
    <div className=' bg-[rgb(225,232,236)]'>
      <div className="relative w-screen overflow-hidden bg-[rgb(225,232,236)]">
        {/* Your original grain overlay */}


        <div className="relative z-10 flex-col flex py-30 w-full max-w-7xl mx-auto px-6">
          {/* Navigation breadcrumb - subtle addition */}
          <nav className="mb-8 opacity-80">
            <div className="flex items-center space-x-2 text-sm text-[#0E1C29]/60">
              <Link
                href='/projects'
                className="hover:text-[#0E1C29] font-inter transition-colors duration-200"
              >
                Projects
              </Link>
              <span>/</span>
              <span className="text-[#0E1C29]/80  font-intermedium">{projectData.title}</span>
            </div>
          </nav>

          {/* Hero Section - maintaining your exact layout */}
          <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <motion.h1 variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="text-5xl text-[#0E1C29] satoshi-font">{projectData.title}</motion.h1>
              <motion.p variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="text-lg   font-inter  text-[#0E1C29]/80">
                {projectData.description}
              </motion.p>

              {/* Buttons */}
              <div className=' w-full flex '>
                <Button button2='Site Preview' button2_url={projectData.siteUrl} />
              </div>

            </div>

            {/* Right Column - Details */}
            <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1  font-inter sm:grid-cols-2 gap-8 w-full">
              {projectData.details.map((detail) => (
                <DetailItem key={detail.id} detail={detail} />
              ))}
            </motion.div>
          </div>

          {/* Project Images and Content - maintaining exact structure */}
          <div className="flex flex-col font-inter  items-center gap-8">
            {/* First Image */}
            {projectData.images[0] && <ProjectImage image={projectData.images[0]} />}

            {/* Content Section */}
            <ContentSection content={projectData.content} />

            {/* Remaining Images */}
            {projectData.images.slice(1).map((image) => (
              <ProjectImage key={image.id} image={image} />
            ))}

            {/* Conclusion - enhanced with subtle animation */}
            <div className="max-w-6xl px-5 font-inter text-[#0E1C29] text-center p-6 rounded-2xl ">
              <h3 className="text-xl  font-intermedium mb-4 text-[#0E1C29]">Conclusion</h3>
              <p className=' font-inter text-start'>{projectData.conclusion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Projects Section - maintaining your exact styling */}
      <div className="relative bg-transparent w-full py-12 px-6">
        {/* Your original grain overlay */}


        <div className="relative z-10 max-w-[1240px] mx-auto">
          <h2 className="text-3xl font-intermedium satoshi-font  mb-8 text-center text-[#0E1C29]">Other Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-[auto_auto] justify-center gap-y-6 gap-x-[10px]">
            {projectsData
              .filter(project => project.id !== projectData.id)
              .slice(0, 2)
              .map(project => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  img={project.images[0]?.src || "/project/default.svg"}
                  description={project.description}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="relative w-screen overflow-hidden ">
        {/* Grain Overlay */}

        <Navbar />
        <TopNavbar />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default ProjectDetails;