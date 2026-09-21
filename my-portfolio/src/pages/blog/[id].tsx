import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

const Dash = ({ index, scrollYProgress, totalDashes }: { index: number, scrollYProgress: MotionValue<number>, totalDashes: number }) => {
  const backgroundColor = useTransform(scrollYProgress, (val: number) => {
    const currentIndex = Math.min(totalDashes - 1, Math.max(0, Math.floor(val * totalDashes)));
    return currentIndex === index ? "#0E1C29" : "#D1D5DB";
  });

  return (
    <motion.div
      style={{ backgroundColor }}
      className="w-5 h-[3px] rounded-full"
    />
  );
};

import Footer from '../footer';
import { Navbar, TopNavbar } from '@/components/sections/navigation';
import HomeImage from '@/assert/home/Image.svg';
import Group1Svg from "@/assert/Group 1.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

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
  author: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
}

const blogsData: BlogData[] = [
  {
    id: 1,
    title: 'How I Built a Real-Time Multiplayer Coding Platform',
    description: 'Architecture, WebSockets & Scalability — the engineering decisions behind Clash of Code, a platform where users join contests, collaborate, submit code, and see changes in real time.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#5196fd',
    author: 'Gowtham',
    date: 'Oct 12, 2026',
    readTime: '12 min read',
    content: [
      { type: 'p', text: "Building a coding platform is relatively straightforward when a single user is solving a problem. Building one where multiple users can join the same contest, communicate, collaborate, submit code, receive results, and see changes in real time is a completely different engineering problem." },
      { type: 'p', text: "That was the challenge behind Clash of Code. The project started as a full-stack application, but as I added real-time collaboration, matchmaking, code execution, and competitive features, I had to think beyond CRUD APIs." },
      { type: 'h2', text: "1. The Problem" },
      { type: 'p', text: "A traditional web application follows a simple request-response model. This works well for dashboards and blogs. A multiplayer coding platform has a different requirement — when one user joins a room, submits code, or changes their status, other users need to know immediately. Polling the server is possible, but it introduces unnecessary latency. I needed the server to push events to connected clients. That led me to WebSockets." },
      { type: 'code', lang: 'text', text: "Client\n   \u2193\nHTTP Request\n   \u2193\nBackend\n   \u2193\nDatabase\n   \u2193\nHTTP Response" },
      { type: 'h2', text: "2. High-Level Architecture" },
      { type: 'p', text: "The system evolved into several independent components. The key architectural decision was separating different responsibilities instead of putting everything inside one backend process." },
      { type: 'diagram', src: '/blog-arch-1.png', caption: 'Fig 1. \u2014 High-level system architecture: Clients \u2192 Node.js API + Socket.io \u2192 PostgreSQL / Redis \u2192 Code Execution (Judge0) \u2192 Docker.' },
      { type: 'h2', text: "3. Why WebSockets?" },
      { type: 'p', text: "HTTP is fundamentally request-driven. With WebSockets, the communication channel stays open and the server can proactively push events. For a multiplayer application, this model is far superior." },
      { type: 'code', lang: 'javascript', text: "// Emit to a specific user\nsocket.emit(\"contest-started\", contest);\n\n// Broadcast to everyone in a contest room\nio.to(contestId).emit(\"contest-update\", data);" },
      { type: 'h2', text: "4. Room-Based Communication" },
      { type: 'p', text: "Each contest has its own Socket.io room. When a participant joins a contest, they join that room. The server broadcasts only to participants in that specific contest, preventing cross-contamination of events between different rooms." },
      { type: 'code', lang: 'javascript', text: "// User joins a contest\nsocket.join(contestId);\n\n// Server notifies only that contest's participants\nio.to(contestId).emit(\"player-joined\", player);" },
      { type: 'h2', text: "5. Code Execution as a Separate Concern" },
      { type: 'p', text: "The application cannot safely execute user-submitted source code on the main API server. A submission might consume excessive CPU, memory, or execution time. Code execution is isolated through Judge0, which runs code inside Docker containers, completely separated from the main API process." },
      { type: 'h2', text: "6. Scaling Beyond a Single Server" },
      { type: 'p', text: "WebSocket connections are stateful. User A might be connected to Server A while User B is on Server B. If Server A receives an event, Server B needs to know. Redis becomes a shared pub/sub coordination layer between all server instances." },
      { type: 'diagram', src: '/blog-scale-1.png', caption: 'Fig 2. \u2014 Horizontal scaling: Load Balancer \u2192 multiple Node.js servers coordinating through Redis pub/sub \u2192 PostgreSQL.' },
      { type: 'h2', text: "7. Asynchronous Code Execution" },
      { type: 'p', text: "Not every operation should block an HTTP request. Code execution is enqueued as a background job. A worker picks it up, executes it, stores the result, then notifies the client via WebSocket when done." },
      { type: 'code', lang: 'text', text: "Request \u2192 Create Job \u2192 Queue\n   \u2193\nWorker \u2192 Execute Code \u2192 Store Result\n   \u2193\nNotify Client via WebSocket" },
      { type: 'quote', text: "Real-time applications are not simply REST APIs with WebSockets added on top. They require thinking about state, concurrency, failure recovery, and communication patterns." },
      { type: 'h2', text: "8. Key Lessons" },
      { type: 'p', text: "Building Clash of Code changed how I approach backend development. I started thinking about features. As the system grew, I started thinking in terms of communication, state, concurrency, isolation, scalability, and failure. That shift — from implementing features to designing systems — is the most valuable thing I learned from this project." }
    ]
  },
  {
    id: 2,
    title: 'What Happens When 100 Users Submit Code at the Same Time?',
    description: 'Designing a scalable code execution system \u2014 CPU consumption, memory, concurrency, queues, isolation, timeouts, and the architecture decisions behind a production-grade coding platform.',
    src: 'tree.jpg',
    link: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#8f89ff',
    author: 'Gowtham',
    date: 'Oct 8, 2026',
    readTime: '10 min read',
    content: [
      { type: 'p', text: "A coding platform looks simple from the user's perspective. You write code, click Run, and wait for the result. But behind that button is a much more interesting engineering problem." },
      { type: 'p', text: "What happens when one user submits code? That is easy. What happens when 100 users submit code at almost the same time? Now we have to think about CPU consumption, memory, concurrency, queues, isolation, timeouts, failures, and scalability." },
      { type: 'h2', text: "1. The Simplest Architecture" },
      { type: 'p', text: "The first architecture that comes to mind sends every submission directly through the backend. But imagine the backend receives 100 submissions simultaneously \u2014 it must handle HTTP requests, authentication, database access, WebSocket connections, AND execute potentially expensive workloads all at once. Code execution should not compete with normal application traffic." },
      { type: 'code', lang: 'text', text: "User\n  \u2193\nBackend API\n  \u2193\nExecute Code\n  \u2193\nReturn Result" },
      { type: 'h2', text: "2. Separate the Execution Layer" },
      { type: 'p', text: "The solution is to establish a clear architectural boundary. The main API handles application logic. A dedicated execution layer handles the expensive workload. This separation means a CPU-intensive submission can never starve normal API traffic." },
      { type: 'h2', text: "3. Why Executing User Code Is Different" },
      { type: 'p', text: "Running code submitted by users requires isolation. An infinite loop, memory exhaustion, or filesystem access could damage the host server. The execution environment needs time limits, memory limits, process isolation, filesystem restrictions, and resource quotas." },
      { type: 'code', lang: 'cpp', text: "// A simple hostile submission\nwhile(true) {\n  // Consumes CPU indefinitely without limits\n}" },
      { type: 'h2', text: "4. Introducing a Queue" },
      { type: 'p', text: "A queue gives us a buffer between incoming requests and execution workers. The API accepts the request and creates a job immediately. Workers then process jobs according to available capacity. This decouples demand from processing speed." },
      { type: 'diagram', src: '/blog-queue-2.png', caption: 'Fig 1. \u2014 Job queue architecture: API Server feeds submissions into a queue, and multiple workers drain the queue and route to Judge0 + Docker.' },
      { type: 'h2', text: "5. Why a Queue Helps" },
      { type: 'p', text: "Suppose 100 users submit code simultaneously but only 10 workers are available. Instead of crashing or timing out, 10 jobs begin processing while 90 wait. As each worker finishes, it picks up the next job. The queue acts as a pressure valve between demand and capacity." },
      { type: 'code', lang: 'text', text: "Incoming: 100 submissions\nWorkers:  10 concurrent\n\nProcessing: 10\nWaiting:    90\n\n\u2192 Worker completes job 1 \u2192 picks up job 11\n\u2192 Worker completes job 2 \u2192 picks up job 12" },
      { type: 'h2', text: "6. Using Judge0" },
      { type: 'p', text: "For Clash of Code, I used Judge0 as the execution layer. A submission carries source code, a language ID, and stdin. Judge0 returns stdout, stderr, status, execution time, and memory usage. The backend converts this into an application-level response." },
      { type: 'code', lang: 'json', text: "{\n  \"source_code\": \"print(input())\",\n  \"language_id\": 71,\n  \"stdin\": \"Hello World\"\n}" },
      { type: 'h2', text: "7. The Complete Execution Pipeline" },
      { type: 'p', text: "Putting it all together, the full pipeline separates every major responsibility. The API handles request acceptance. The queue buffers demand. Workers manage execution throughput. Judge0 handles isolation. WebSockets deliver results in real time without the client polling." },
      { type: 'diagram', src: '/blog-pipeline-2.png', caption: 'Fig 2. \u2014 Complete execution pipeline: Client \u2192 API \u2192 Queue \u2192 Workers \u2192 Judge0 \u2192 Docker \u2192 Result \u2192 WebSocket \u2192 Client.' },
      { type: 'h2', text: "8. Handling Failures" },
      { type: 'p', text: "Distributed systems should assume that failures will happen. A worker might crash. Judge0 might be temporarily unavailable. A submission might exceed its time limit. Every submission needs explicit states that can be monitored and debugged." },
      { type: 'code', lang: 'text', text: "QUEUED \u2192 RUNNING \u2192 COMPLETED\n             \u2193\n           FAILED\n             \u2193\n    TIME_LIMIT_EXCEEDED" },
      { type: 'h2', text: "9. Rate Limiting" },
      { type: 'p', text: "A malicious client could flood the execution system with hundreds of submissions. Rate limiting controls how frequently a user can create execution jobs, protecting the infrastructure from deliberate or accidental abuse." },
      { type: 'h2', text: "10. Key Lessons" },
      { type: 'quote', text: "Scalability is not simply about adding more servers. It is about isolating workloads, controlling concurrency, managing failures, and designing each component around a single responsibility." },
      { type: 'p', text: "This project changed how I think about scalability. Previously, I thought: 'Can the application handle this request?' Now I think: 'What happens when the same request arrives 1,000 times simultaneously?' That shift in perspective is the most important engineering lesson I took away from building Clash of Code." }
    ]
  },
  {
    id: 3,
    title: 'Mastering Fluid UI Animations',
    description: 'Breathe soul into your interfaces. Learn the physics of organic, GPU-accelerated micro-interactions that captivate users without sacrificing an ounce of performance.',
    src: 'water.jpg',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#13006c',
    author: 'Gowtham',
    date: 'Sep 24, 2026',
    readTime: '4 min read',
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
    title: 'The Intersection of AI and UX Design',
    description: 'Navigate the new frontier of cognitive interfaces. See how generative AI is upending traditional UX paradigms and shaping intelligent, highly adaptive design systems.',
    src: 'house.jpg',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=1200&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#ed649e',
    author: 'Gowtham',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
    content: [
      { type: 'p', text: "Human interaction with digital interfaces is a fascinating field of study. Much like how humans interact with nature, users leave their 'footprints' on our applications through their behavior patterns. Every click, scroll, and hesitation tells a story about how our design is being received." },
      { type: 'h2', text: "Analyzing the Footprints" },
      { type: 'p', text: "By analyzing these patterns, we can iteratively improve the UX. Heatmaps, session replays, and A/B testing provide us with the data needed to make informed design decisions. We can see where users get 'stuck' and smooth out the terrain." },
      { type: 'quote', text: "Data tells you what is happening, but empathy tells you why." },
      { type: 'p', text: "However, data alone is not enough. We must approach design with empathy, understanding the frustrations and goals of the people on the other side of the screen. Are they rushing to complete a task? Are they exploring casually? The context of their visit dictates how our interface should respond." },
      { type: 'h2', text: "Building Sustainable UX" },
      { type: 'p', text: "Continuous iteration and empathetic design lead to products that not only serve a function but also respect the user's time and cognitive load." }
    ]
  },
  {
    id: 5,
    title: 'Optimizing Next.js for the Edge',
    description: 'Shatter performance bottlenecks. Deploy state-of-the-art edge computing, granular caching, and surgical hydration to deliver blazing-fast, sub-second load times worldwide.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#fd521a',
    author: 'Gowtham',
    date: 'Sep 2, 2026',
    readTime: '8 min read',
    content: [
      { type: 'p', text: "Starting a new project is always a daunting yet exhilarating experience. Booting up a fresh Next.js environment is like a blank canvas. You have the power to build anything, but you also have the responsibility to build it right." },
      { type: 'h2', text: "The Blank Canvas" },
      { type: 'p', text: "The possibilities are endless. But with great power comes great responsibility. Structuring the project correctly from day one is crucial for long-term scalability. A messy folder structure might work for a weekend hackathon, but it will quickly become a nightmare for a production application." },
      { type: 'quote', text: "Good architecture is like a good camera—it gets out of the way so you can focus on the subject." },
      { type: 'p', text: "I always begin with defining the core architecture—routing, state management, and the component hierarchy. This foundational work pays off exponentially as the project grows in complexity. It allows you to move faster later, refactor with confidence, and onboard new team members effortlessly." },
      { type: 'h2', text: "Capturing the Vision" },
      { type: 'p', text: "In the end, writing code requires vision, technical skill, and the patience to wait for the perfect moment (or the perfect bug fix!). The ultimate goal is to create something that resonates through a flawless user experience." }
    ]
  }
];

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
    <div className="text-center">
      <h1 className="text-4xl font-satoshi font-bold text-gray-900 mb-4">Story Not Found</h1>
      <p className="text-gray-600 mb-8 font-inter">The story you are looking for doesn&apos;t exist or has been removed.</p>
      <Link href="/#blogs" className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium">
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

  const { scrollYProgress } = useScroll();
  const scrollbarOpacity = useTransform(scrollYProgress, [0, 0.9, 0.95], [1, 1, 0]);

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
      <div className="flex items-center justify-center min-h-screen w-full bg-white">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (notFound || !blogData) {
    return <NotFoundPage />;
  }

  return (
    <div className='bg-[rgb(225,232,236)] min-h-screen font-inter'>

      {/* Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <Image src={Group1Svg} alt="Background" fill className="object-cover scale-145 opacity-50" />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div style={{ opacity: scrollbarOpacity }} className="fixed right-6 xl:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-[100]">
        {Array.from({ length: 8 }).map((_, i) => (
          <Dash key={i} index={i} scrollYProgress={scrollYProgress} totalDashes={8} />
        ))}
      </motion.div>

      {/* Navbar Integration */}
      <div className="relative z-50">
        <Navbar />
        <TopNavbar />
      </div>

      <article className="max-w-[720px] mx-auto px-5 pt-32 pb-24 relative z-10">

        {/* Title */}
        <motion.h1
          variants={cardVariants} initial="hidden" animate="show"
          className="text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] font-bold font-satoshi text-gray-900 mb-4"
        >
          {blogData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={cardVariants} initial="hidden" animate="show"
          className="text-lg md:text-[22px] leading-snug text-gray-500 font-inter mb-8"
        >
          {blogData.description}
        </motion.h2>


        {/* Large Cover Image */}
        <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full aspect-[16/9] relative mb-12 bg-gray-100 rounded-sm overflow-hidden">
          <Image src={blogData.link} alt={blogData.title} fill className="object-cover" unoptimized />
        </motion.div>

        {/* Article Body */}
        <div className="font-inter text-[19px] leading-[32px] text-gray-800">
          {blogData.content.map((block, index) => {
            if (block.type === 'h2') {
              return (
                <motion.h2 variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="text-2xl sm:text-[26px] font-bold font-satoshi text-gray-900 mt-12 mb-4">
                  {block.text}
                </motion.h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <motion.blockquote variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="border-l-4 border-gray-900 pl-6 py-2 my-10 text-xl sm:text-2xl italic font-satoshi text-gray-800">
                  {block.text}
                </motion.blockquote>
              );
            }
            if (block.type === 'diagram') {
              return (
                <motion.figure
                  variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                  key={index}
                  className="my-12 -mx-6 sm:-mx-12 md:-mx-20"
                >
                  <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden rounded-md">
                    <Image src={block.src} alt={block.caption} fill className="object-cover" unoptimized />
                  </div>
                  <figcaption className="mt-3 mx-6 sm:mx-12 md:mx-20 text-sm text-center text-gray-500 font-inter italic">
                    {block.caption}
                  </figcaption>
                </motion.figure>
              );
            }
            if (block.type === 'code') {
              return (
                <motion.div
                  variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                  key={index}
                  className="my-8 rounded-xl overflow-hidden border border-gray-200/70"
                >
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1e1e2e] border-b border-white/10">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="ml-3 text-xs text-gray-400 font-mono">{block.lang}</span>
                  </div>
                  <pre className="bg-[#1e1e2e] px-6 py-5 overflow-x-auto text-[14px] leading-relaxed text-gray-200 font-mono whitespace-pre">{block.text}</pre>
                </motion.div>
              );
            }
            return (
              <motion.p variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="mb-8 tracking-[-0.011em]">
                {block.text}
              </motion.p>
            );
          })}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetails;
