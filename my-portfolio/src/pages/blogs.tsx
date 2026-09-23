import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack.jsx"
import Image from 'next/image';
import { Header, Button } from '@/components/sections/ui';

const projects = [
  {
    id: 1,
    title: 'Building a Multiplayer Coding Platform',
    description:
      'Architecture, WebSockets & Scalability — the engineering decisions behind Clash of Code, a platform where users join contests, collaborate, submit code, and see changes in real time.',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
    tag: '#fullstack',
  },
  {
    id: 2,
    title: '100 Users Submitting Code at Once',
    description:
      'Designing a scalable code execution system — CPU consumption, memory, concurrency, queues, isolation, timeouts, and the architecture decisions behind a production-grade coding platform.',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    color: '#8f89ff',
    tag: '#backend',
  },
  {
    id: 3,
    title: 'From localhost to AWS',
    description:
      'A practical engineering case study covering EC2, RDS, S3, networking, environment configuration, WebSockets, security, scaling, debugging, and cloud cost decisions.',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    color: '#4f9cf9',
    tag: '#devops',
  },
  {
    id: 4,
    title: 'PostgreSQL at Scale',
    description:
      'A practical guide to relational modeling, normalization, constraints, indexes, transactions, query planning, concurrency, connection pooling, and database bottlenecks.',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    color: '#5b8def',
    tag: '#database',
  },
  {
    id: 5,
    title: 'From REST APIs to Distributed Systems',
    description:
      'A system-design journey through caching, queues, load balancing, horizontal scaling, observability, and the trade-offs that appear when a simple backend becomes a distributed application.',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    color: '#7c6ff2',
    tag: '#systemdesign',
  },
];

export default function Blogs() {
  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-95 bg-transparent rounded-[50px] xs:rounded-[60px] sm:rounded-[70px] md:rounded-[80px] lg:rounded-[90px] xl:rounded-[100px] overflow-x-hidden py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-h-screen">

      <Header title='Blogs' heading='Insights and Ideas' description='Exploring thoughts on technology, design, and digital experiences.' />

      <ScrollStack useWindowScroll={true} itemStackDistance={40} stackPosition="15%" itemScale={0.05} onStackComplete={() => { }}>
        {projects.map((project, i) => (
          <ScrollStackItem key={i} itemClassName="!p-0 !min-h-[280px] xs:!min-h-[300px] sm:!min-h-[280px] md:!min-h-[300px] h-auto !border-none !shadow-none !bg-transparent flex justify-center !my-10 sm:!my-14 md:!my-16">
            <div
              className="group flex flex-col sm:flex-row-reverse relative min-h-[280px] xs:min-h-[300px] sm:min-h-[280px] md:min-h-[300px] h-auto w-full lg:w-[95%] xl:w-[90%] rounded-[24px] xs:rounded-[28px] p-4 xs:p-5 sm:p-6 gap-4 xs:gap-5 sm:gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-white border border-white hover:border-blue-100 transition-all duration-500 ease-out hover:-translate-y-1 overflow-hidden"
            >
              {/* Image tile with tag pill overlay */}
              <div className="relative w-full sm:w-[38%] md:w-[34%] aspect-[4/3] sm:aspect-square shrink-0 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500 border border-black/5">
                <Image
                  fill
                  src={project.link}
                  alt={project.title}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  unoptimized
                />
                <span className="absolute top-3 left-3 xs:top-4 xs:left-4 text-[10px] xs:text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full tracking-wide">
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-h-0 min-w-0 text-gray-700">
                <div>
                  {/* Serial Number Badge - Top Left (Inline) */}
                  <div
                    className="mb-3 xs:mb-4 flex items-center justify-center shrink-0 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white font-intermedium text-[10px] sm:text-sm md:text-base bg-[#0E1C29] group-hover:bg-[#1a365d] group-hover:scale-110 transition-all duration-500 ease-out"
                    style={{
                      borderRadius: "100px",
                      boxShadow:
                        "rgba(0,0,0,0.09) 0px 1.34px 0.54px -0.625px, rgba(0,0,0,0.086) 0px 3.18px 1.27px -1.25px, rgba(0,0,0,0.082) 0px 5.81px 2.32px -1.875px, rgba(0,0,0,0.08) 0px 9.66px 3.86px -2.5px, rgba(0,0,0,0.07) 0px 15.6px 6.24px -3.125px, rgba(0,0,0,0.063) 0px 25.53px 10.21px -3.75px, rgba(0,0,0,0.04) 0px 43.96px 17.58px -4.375px, rgba(0,0,0,0) 0px 80px 32px -5px",
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold font-satoshi text-[#0E1C29] group-hover:text-blue-900 transition-colors duration-300 leading-snug">
                    {project.title}
                  </h2>
                  <p className="mt-2 xs:mt-3 text-[11px] xs:text-xs sm:text-sm font-intermedium leading-relaxed line-clamp-3 sm:line-clamp-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>

                {/* Footer: Read Time and Button */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-500 font-intermedium text-[11px] xs:text-xs sm:text-sm">
                    <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="whitespace-nowrap">10 min read</span>
                  </div>
                  <Button button1="See Blog" button1_url={`/blog/${project.id}`} showButton2={false} mt="0" />
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

    </div>
  );
}