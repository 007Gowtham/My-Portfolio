import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../../app/globals.css';
import Footer from '../footer';
import Navbar from '@/components/sections/navbar';
import TopNavbar from '@/components/sections/topnavbar';
import Button from '@/components/sections/button';

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
  src: string;
  alt: string;
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
  details: ProjectDetail[];
  images: ProjectImage[];
  content: ProjectContent[];
  conclusion: string;
}

// Projects data array - maintaining your original structure
const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "LanderOS",
    description: "LanderOS is a modern Framer template crafted for SaaS startups to showcase features, engage users, and drive growth effortlessly.",
    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className: "box-border  text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className: "box-border  flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],
    details: [
      {
        id: 1,
        label: "Services",
        value: "Product Design, Strategy, Branding"
      },
      {
        id: 2,
        label: "Tools",
        value: "Framer, Figma"
      },
      {
        id: 3,
        label: "Value",
        value: "Highly customizable, high performance"
      },
      {
        id: 4,
        label: "Timeline",
        value: "2 weeks"
      }
    ],
    images: [
      {
        id: 1,
        src: "/project/p1.svg",
        alt: "LanderOS Project Image 1"
      },
      {
        id: 2,
        src: "/project/p1.svg",
        alt: "LanderOS Project Image 2"
      },
      {
        id: 3,
        src: "/project/p1.svg",
        alt: "LanderOS Project Image 3"
      },
      {
        id: 4,
        src: "/project/p1.svg",
        alt: "LanderOS Project Image 4"
      }
    ],
    content: [
      {
        id: 1,
        text: "The primary goal of LanderOS is to provide businesses with an intuitive and modern waitlist template, seamlessly combining advanced features with a sleek and professional design—helping them capture leads and build anticipation for their products or services.",
        highlight: "LanderOS"
      },
      {
        id: 2,
        text: "With its robust features and user-friendly interface, LanderOS has redefined how businesses generate interest and engage with their audience."
      }
    ],
    conclusion: "In conclusion, LanderOS is the ultimate solution for businesses and startups seeking a professional, feature-rich, and customizable waitlist template. With its sleek design, advanced functionality, and ease of use, LanderOS allows businesses to attract and engage their audience effectively, setting the stage for successful product launches and growth."
  },
  {
    id: 2,
    title: "DataViz Pro",
    description: "DataViz Pro is an advanced data visualization platform designed to transform complex datasets into beautiful, interactive charts and dashboards.",
    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className: "box-border  text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className: "box-border  flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],
    details: [
      {
        id: 1,
        label: "Services",
        value: "Data Visualization, UX Design, Development"
      },
      {
        id: 2,
        label: "Tools",
        value: "React, D3.js, TypeScript"
      },
      {
        id: 3,
        label: "Value",
        value: "Interactive dashboards, Real-time data"
      },
      {
        id: 4,
        label: "Timeline",
        value: "4 weeks"
      }
    ],
    images: [
      {
        id: 1,
        src: "/project/p2.svg",
        alt: "DataViz Pro Dashboard"
      },
      {
        id: 2,
        src: "/project/p2.svg",
        alt: "DataViz Pro Charts"
      },
      {
        id: 3,
        src: "/project/p2.svg",
        alt: "DataViz Pro Analytics"
      }
    ],
    content: [
      {
        id: 1,
        text: "DataViz Pro revolutionizes how businesses understand their data through powerful visualization tools and interactive dashboards.",
        highlight: "DataViz Pro"
      },
      {
        id: 2,
        text: "Built with modern technologies and user-centric design principles, it provides real-time insights that drive business decisions."
      }
    ],
    conclusion: "DataViz Pro stands as a comprehensive solution for data visualization needs, offering powerful tools and beautiful interfaces that make complex data accessible and actionable."
  },
  {
    id: 3,
    title: "EcoTrack",
    description: "EcoTrack is a sustainability tracking application that helps organizations monitor and reduce their environmental impact through comprehensive analytics.",
    buttons: [
      {
        id: 1,
        text: "Contact Me",
        icon: "/buttons/Group.svg",
        type: "primary",
        className: "box-border  text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      },
      {
        id: 2,
        text: "See Project",
        icon: "/buttons/Vector.svg",
        type: "secondary",
        className: "box-border  flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      }
    ],
    details: [
      {
        id: 1,
        label: "Services",
        value: "Sustainability Design, Analytics, Mobile Development"
      },
      {
        id: 2,
        label: "Tools",
        value: "React Native, Node.js, MongoDB"
      },
      {
        id: 3,
        label: "Value",
        value: "Environmental impact tracking, Carbon footprint analysis"
      },
      {
        id: 4,
        label: "Timeline",
        value: "6 weeks"
      }
    ],
    images: [
      {
        id: 1,
        src: "/project/p3.svg",
        alt: "EcoTrack Dashboard"
      },
      {
        id: 2,
        src: "/project/p3.svg",
        alt: "EcoTrack Mobile App"
      }
    ],
    content: [
      {
        id: 1,
        text: "EcoTrack empowers organizations to take control of their environmental impact with comprehensive tracking and reporting tools.",
        highlight: "EcoTrack"
      },
      {
        id: 2,
        text: "Through innovative technology and user-friendly interfaces, it makes sustainability management accessible and effective."
      }
    ],
    conclusion: "EcoTrack represents the future of environmental responsibility, providing organizations with the tools they need to create meaningful change and achieve their sustainability goals."
  }
];

// Enhanced 404 Error Component - maintaining your original color scheme
const NotFoundPage: React.FC = () => (
  <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#F0F8FF]/90">
    {/* Your original grain overlay */}
    <Image
      src="/home/image.svg" 
      alt="grain texture" 
      fill
      className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0" 
    />
    
    <div className="relative z-10 text-center space-y-6 px-4">
      <h1 className="text-9xl font-bold text-gray-300 animate-pulse">404</h1>
      <h2 className="text-4xl font-bold text-gray-700">Project Not Found</h2>
      <p className="text-xl text-gray-600 max-w-md mx-auto">
        The project you're looking for doesn't exist. Please check the URL or go back to the projects page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => window.history.back()}
          className="box-border  text-white flex justify-center items-center gap-3 px-6 py-3 shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35)] bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          Go Back
        </button>
        <button 
          onClick={() => window.location.href = '/projects'}
          className="box-border  flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          View All Projects
        </button>
      </div>
    </div>
  </div>
);

// Component Props interfaces
interface ProjectButtonProps {
  button: ProjectButton;
}

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
  img: string;
  description: string;
}


// Enhanced Detail Item Component - maintaining your style but adding subtle hover
const DetailItem: React.FC<DetailItemProps> = ({ detail }) => (
  <div className="grid gap-1 p-4 font-inter rounded-xl transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-sm hover:-translate-y-1">
    <div className="italic text-lg font-inter text-[#0E1C29]/80">{detail.label}</div>
    <p className="text-gray-700 font-inter text-md">{detail.value}</p>
  </div>
);

// Enhanced Project Image Component - keeping your rounded-4xl style
const ProjectImage: React.FC<ProjectImageProps> = ({ image }) => (
  <div className="relative w-full bg-white p-3 rounded-4xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
    <Image 
      src={image.src} 
      width={1400} 
      height={1400} 
      alt={image.alt} 
      className="rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
    />
  </div>
);

// Enhanced Content Section Component - maintaining your exact styling
const ContentSection: React.FC<ContentSectionProps> = ({ content }) => (
  <div className="flex  flex-col font-inter gap-5 py-5 text-md w-full px-5 text-[#0E1C29]">
    {content.map((item, index) => (
      <div 
        key={item.id}
        className="transition-all font-inter duration-300 hover:translate-x-2 p-4 rounded-xl hover:bg-white/30 hover:backdrop-blur-sm"
        style={{
          animationDelay: `${index * 100}ms`,
          opacity: 0,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}
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
      </div>
    ))}
  </div>
);

// Enhanced Project Card Component - keeping your custom-card class and exact styling
const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, img, description }) => {
  const router = useRouter();
  
  return (
    <div 
      className="custom-card bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] border border-white/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 hover:bg-white/10"
      onClick={() => router.push(`/project/${id}`)}
    >
      <div className="relative shadow-xl rounded-xl sm:rounded-2xl w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 z-10 overflow-hidden group">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
        <h3 className="text-xs xs:text-sm sm:text-base md:text-lg w-full text-[#0E1C29]/50 font-inter transition-colors duration-300 hover:text-[#0E1C29]/80">{title}</h3>
        <h3 className="flex w-full items-start relative justify-end">
          <Image 
            src="/project/arrow.svg" 
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
        <img 
          src="/home/image.svg" 
          alt="grain texture" 
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
    <div>
      <div className="relative w-screen overflow-hidden bg-[#F0F8FF]/80">
        {/* Your original grain overlay */}
        <img 
          src="/home/image.svg" 
          alt="grain texture" 
          className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0" 
        />

        <div className="relative z-10 flex-col flex py-30 w-full max-w-7xl mx-auto px-6">
          {/* Navigation breadcrumb - subtle addition */}
          <nav className="mb-8 opacity-80">
            <div className="flex items-center space-x-2 text-sm text-[#0E1C29]/60">
              <button 
                onClick={() => router.push('/projects')}
                className="hover:text-[#0E1C29] font-inter transition-colors duration-200"
              >
                Projects
              </button>
              <span>/</span>
              <span className="text-[#0E1C29]/80  font-intermedium">{projectData.title}</span>
            </div>
          </nav>

          {/* Hero Section - maintaining your exact layout */}
          <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-5xl text-[#0E1C29] satoshi-font animate-fadeInUp">{projectData.title}</h1>
              <p className="text-lg   font-inter  text-[#0E1C29]/80 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                {projectData.description}
              </p>
              
              {/* Buttons */}
              <div className=' w-full flex '>
              <Button button2='Site Preview'/>
              </div>

            </div>

            {/* Right Column - Details */}
            <div className="grid grid-cols-1  font-inter sm:grid-cols-2 gap-8 w-full animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              {projectData.details.map((detail) => (
                <DetailItem key={detail.id} detail={detail} />
              ))}
            </div>
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
            <div className="max-w-6xl px-5 font-inter text-[#0E1C29] text-center p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/30 animate-fadeInUp">
              <h3 className="text-xl  font-intermedium mb-4 text-[#0E1C29]">Conclusion</h3>
              <p className=' font-inter'>{projectData.conclusion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Projects Section - maintaining your exact styling */}
      <div className="relative bg-[#F0F8FF]/80 w-full py-12 px-6">
        {/* Your original grain overlay */}
        <img 
          src="/home/image.svg" 
          alt="grain texture" 
          className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0" 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold satoshi-font  mb-8 text-center text-[#0E1C29]">Other Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="relative w-screen overflow-hidden bg-[#F0F8FF]/90 ">
  {/* Grain Overlay */}
  <img 
    src="/home/image.svg" 
    alt="grain texture" 
    className="absolute inset-0 w-full h-full object-cover  opacity-8 pointer-events-none z-0" 
  />
  <Navbar/>
  <TopNavbar/>
  <div className="relative z-10">
          <Footer />
        </div>
  </div>

      {/* Footer */}

      {/* CSS animations - keeping minimal and subtle */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;