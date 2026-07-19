import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

import Footer from '../footer';
import { Navbar, TopNavbar } from '@/components/sections/navigation';
import HomeImage from '@/assert/home/Image.svg';
import Group1Svg from "@/assert/Group 1.svg";

type ContentBlock = {
  type: 'h2' | 'p' | 'quote';
  text: string;
};

interface BlogData {
  id: number;
  title: string;
  description: string;
  src: string;
  link: string;
  blogUrl: string;
  color: string;
  content: ContentBlock[];
}

const blogsData: BlogData[] = [
  {
    id: 1,
    title: 'Matthias Leidinger',
    description: 'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#5196fd',
    content: [
      { type: 'p', text: "In this article, we dive deep into the world of photography and design, exploring how light and shadow shape our perception of digital products. The intersection between physical mediums and digital interfaces is often overlooked, yet it holds the key to creating truly immersive web experiences." },
      { type: 'h2', text: "The Anatomy of a Frame" },
      { type: 'p', text: "As an interaction designer, one must always look beyond the screen. The way a photographer captures a fleeting moment is highly analogous to how a UX designer maps out a user journey. Both require an acute understanding of focus, framing, and negative space. When a user lands on a webpage, their eyes naturally gravitate toward the point of highest contrast. If we do not carefully orchestrate this visual hierarchy, the user becomes lost." },
      { type: 'quote', text: "Design is not just what it looks like and feels like. Design is how it works. Framing the right content is the first step to making it work." },
      { type: 'p', text: "Consider the balance of elements. In a well-composed photograph, every element serves a purpose. The same applies to UI design. Extraneous elements distract the user from the core task, while a minimalist approach with deliberate accents can guide their attention effortlessly. Think about the 'rule of thirds' applied not just to a static image, but to the layout of a landing page." },
      { type: 'h2', text: "Translating Light to Code" },
      { type: 'p', text: "This philosophy heavily influences my approach to building custom, high-performance websites. Every micro-interaction is like a carefully exposed frame—it must feel intentional, smooth, and natural. By using CSS transitions, Framer Motion, and strategic state management, we can simulate the physics of light and motion in the real world." },
      { type: 'p', text: "In conclusion, studying other disciplines like photography doesn't distract from being a good developer—it enhances it. It gives you a vocabulary for beauty that translates directly into better user experiences." }
    ]
  },
  {
    id: 2,
    title: 'Clément Chapillon',
    description: 'This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.',
    src: 'tree.jpg',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#8f89ff',
    content: [
      { type: 'p', text: "Design systems are the bedrock of any scalable application. Just as nature follows underlying structural rules, our interfaces must adhere to a consistent set of guidelines to remain maintainable. When we try to build without a system, we end up with a wild, arid territory of CSS classes and conflicting states." },
      { type: 'h2', text: "The Tension of Aesthetics" },
      { type: 'p', text: "When we talk about 'contradictory feelings', it often reminds me of the tension between aesthetics and usability. We want our websites to look breathtaking, yet they must also be profoundly functional and accessible. The push and pull between adding a beautiful, heavy animation and maintaining a sub-second load time is a constant battle for the modern frontend engineer." },
      { type: 'quote', text: "A design system acts as the bridge between creative chaos and engineering order." },
      { type: 'p', text: "By establishing a robust design system, we bridge this gap. We define typography, spacing, and color palettes that evoke the right emotions while ensuring sufficient contrast and legibility. Tokens act as our source of truth, meaning that when the 'reality' of a brand changes, our 'imaginary' digital world can adapt instantly." },
      { type: 'h2', text: "Building the Foundation" },
      { type: 'p', text: "Ultimately, a successful digital product is one that harmonizes these conflicting requirements, creating an experience that is both beautiful and invisible to the user. A proper system doesn't limit creativity; it provides the scaffolding so that creativity can scale without collapsing under its own weight." }
    ]
  },
  {
    id: 3,
    title: 'Zissou',
    description: 'Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.',
    src: 'water.jpg',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#13006c',
    content: [
      { type: 'p', text: "Storytelling in UX is often misunderstood. It's not about forcing the user through a rigid narrative, but rather providing them with the tools and environment to craft their own story within your product. When an interface 'insists' on a narrative, it often feels restrictive. When it facilitates one, it feels empowering." },
      { type: 'h2', text: "Crisp and Ethereal Interfaces" },
      { type: 'p', text: "Crisp and ethereal—these are qualities we strive for in modern web development. The 'crispness' comes from optimized performance, zero layout shifts, instantaneous feedback, and razor-sharp typography. It's the technical perfection that users might not actively notice, but they absolutely feel." },
      { type: 'quote', text: "The best interfaces are like water—they take the shape of the user's intent." },
      { type: 'p', text: "The 'ethereal' quality, on the other hand, is achieved through subtle motion and depth. Framer Motion, for instance, allows us to add physics-based animations that feel incredibly organic. Drop shadows, blurs, and glassmorphism can create a sense of layers that float above the screen." },
      { type: 'h2', text: "The Perfect Balance" },
      { type: 'p', text: "When these two elements combine, the interface transcends being just a tool; it becomes an experience. We must strive to build products that don't just function flawlessly, but also leave a lingering, positive emotional imprint on the people who use them every day." }
    ]
  },
  {
    id: 4,
    title: 'Mathias Svold and Ulrik Hasemann',
    description: 'The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.',
    src: 'house.jpg',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#ed649e',
    content: [
      { type: 'p', text: "Human interaction with digital interfaces is a fascinating field of study. Much like how humans interact with the coastlines of Denmark, users leave their 'footprints' on our applications through their behavior patterns. Every click, scroll, and hesitation tells a story about how our design is being received." },
      { type: 'h2', text: "Analyzing the Footprints" },
      { type: 'p', text: "By analyzing these patterns, we can iteratively improve the UX. Heatmaps, session replays, and A/B testing provide us with the data needed to make informed design decisions. We can see where users get 'stuck'—the digital equivalent of a disrupted coastline—and smooth out the terrain." },
      { type: 'quote', text: "Data tells you what is happening, but empathy tells you why." },
      { type: 'p', text: "However, data alone is not enough. We must approach design with empathy, understanding the frustrations and goals of the people on the other side of the screen. Are they rushing to complete a task? Are they exploring casually? The context of their visit dictates how our interface should respond." },
      { type: 'h2', text: "Building Sustainable UX" },
      { type: 'p', text: "Continuous iteration and empathetic design lead to products that not only serve a function but also respect the user's time and cognitive load. Just as we must protect physical coastlines, we must protect our users' attention and energy in the digital space." }
    ]
  },
  {
    id: 5,
    title: 'Mark Rammers',
    description: 'Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#fd521a',
    content: [
      { type: 'p', text: "Starting a new project is always a daunting yet exhilarating experience. 'All over again' perfectly encapsulates the feeling of booting up a fresh Next.js environment. The blank canvas is both terrifying and liberating. You have the power to build anything, but you also have the responsibility to build it right." },
      { type: 'h2', text: "The Blank Canvas" },
      { type: 'p', text: "The possibilities are endless. But with great power comes great responsibility. Structuring the project correctly from day one is crucial for long-term scalability. A messy folder structure might work for a weekend hackathon, but it will quickly become a nightmare for a production application." },
      { type: 'quote', text: "Good architecture is like a good camera—it gets out of the way so you can focus on the subject." },
      { type: 'p', text: "I always begin with defining the core architecture—routing, state management, and the component hierarchy. This foundational work pays off exponentially as the project grows in complexity. It allows you to move faster later, refactor with confidence, and onboard new team members effortlessly." },
      { type: 'h2', text: "Capturing the Vision" },
      { type: 'p', text: "In the end, writing code is a lot like capturing a photograph. It requires vision, technical skill, and the patience to wait for the perfect moment (or the perfect bug fix!). The ultimate goal is to create something that resonates, whether that's through a stunning image or a flawless user experience." }
    ]
  }
];

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[rgb(225,232,236)] p-6">
    <div className="text-center">
      <h1 className="text-4xl font-satoshi font-bold text-[#0E1C29] mb-4">Blog Not Found</h1>
      <p className="text-[#0E1C29]/70 mb-8 font-inter">The article you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="box-border flex gap-3 justify-center items-center px-6 py-3 shadow-[inset_0_2px_4px_0_#ffffff] bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        Go Back Home
      </Link>
    </div>
  </div>
);

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const blogId = parseInt(id as string, 10);

      if (isNaN(blogId)) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const blog = blogsData.find(b => b.id === blogId);

      if (blog) {
        setBlogData(blog);
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
        <Image
          src={HomeImage}
          alt="grain texture"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0"
        />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#0E1C29]/20 border-t-[#0E1C29] rounded-full animate-spin"></div>
          <div className="text-2xl text-gray-600 font-inter">Loading...</div>
        </div>
      </div>
    );
  }

  if (notFound || !blogData) {
    return <NotFoundPage />;
  }

  return (
    <div className='bg-[rgb(225,232,236)] min-h-screen'>
      {/* Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <Image src={Group1Svg} alt="Background" fill className="object-cover scale-145 opacity-50" />
        </div>
      </div>
      
      <div className="relative w-screen overflow-hidden bg-[rgb(225,232,236)]/80">
        <div className="relative z-10 flex-col flex py-20 w-full max-w-4xl mx-auto px-4 sm:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-10 opacity-80 mt-10">
            <div className="flex items-center space-x-2 text-sm text-[#0E1C29]/60">
              <Link
                href="/#blogs"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/');
                }}
                className="hover:text-[#0E1C29] font-inter transition-colors duration-200"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-[#0E1C29]/80 font-intermedium">Blog</span>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="flex flex-col gap-6 mb-16 text-center sm:text-left mt-6">
            <motion.h1 variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="text-4xl sm:text-5xl lg:text-6xl text-[#0E1C29] satoshi-font leading-tight">
              {blogData.title}
            </motion.h1>
          </div>

          {/* Content Section */}
          <div className="flex flex-col font-inter text-[16px] sm:text-lg text-[#0E1C29]/80 leading-relaxed mb-24 max-w-3xl">
            <p className="font-intermedium text-xl sm:text-2xl text-[#0E1C29]/90 mb-8 leading-snug">
              {blogData.description}
            </p>
            
            {blogData.content.map((block, index) => {
              if (block.type === 'h2') {
                return (
                  <motion.h2 variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} key={index} className="text-2xl sm:text-3xl satoshi-font text-[#0E1C29] mt-12 mb-6">
                    {block.text}
                  </motion.h2>
                );
              }
              if (block.type === 'quote') {
                return (
                  <motion.blockquote variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} key={index} className="border-l-[3px] border-[#0E1C29]/40 pl-6 py-2 my-10 text-xl sm:text-2xl italic font-intermedium text-[#0E1C29]/70 bg-white/20 rounded-r-lg">
                    &quot;{block.text}&quot;
                  </motion.blockquote>
                );
              }
              return (
                <motion.p variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} key={index} className="mb-6 font-inter text-[#0E1C29]/80">
                  {block.text}
                </motion.p>
              );
            })}
          </div>

        </div>
      </div>

      <div className="relative w-screen overflow-hidden">
        <Navbar />
        <TopNavbar />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
