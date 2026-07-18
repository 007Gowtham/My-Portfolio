import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack.jsx"
import Image from 'next/image';
import { Header, Button } from '@/components/sections/ui';

const projects = [
  {
    id: 1,
    title: 'Matthias Leidinger',
    description:
      'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#5196fd',
  },
  {
    id: 2,
    title: 'Clément Chapillon',
    description:
      'This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.',
    src: 'tree.jpg',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#8f89ff',
  },
  {
    id: 3,
    title: 'Zissou',
    description:
      'Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.',
    src: 'water.jpg',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#13006c',
  },
  {
    id: 4,
    title: 'Mathias Svold and Ulrik Hasemann',
    description:
      'The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.',
    src: 'house.jpg',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#ed649e',
  },
  {
    id: 5,
    title: 'Mark Rammers',
    description:
      'Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#fd521a',
  },
];

export default function Blogs() {
  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-95 bg-transparent rounded-[50px] xs:rounded-[60px] sm:rounded-[70px] md:rounded-[80px] lg:rounded-[90px] xl:rounded-[100px] overflow-x-hidden py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-h-screen">

      <Header title='Blogs' heading='Insights and Ideas' description='Exploring thoughts on technology, design, and digital experiences.' />

      <ScrollStack useWindowScroll={true} itemStackDistance={40} stackPosition="15%" itemScale={0.05} onStackComplete={() => {}}>
        {projects.map((project, i) => (
          <ScrollStackItem key={i} itemClassName="!p-0 !min-h-[280px] xs:!min-h-[320px] sm:!min-h-[400px] md:!h-[450px] h-auto !border-none !shadow-none !bg-transparent flex justify-center !my-16">
            <div
              className="flex flex-col relative min-h-[280px] xs:min-h-[320px] sm:min-h-[400px] h-auto md:h-[450px] w-full lg:w-[80%] rounded-[20px] xs:rounded-[30px] p-3 xs:p-4 sm:p-6 lg:p-10 shadow-2xl bg-[#F6FBFF]"
            >
              <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-medium font-intermedium text-[#0E1C29] text-center">{project.title}</h2>
              <div className="border-t-2 my-2 xs:my-3 sm:my-5 md:my-7 border-dotted border-gray-300 w-full"></div>

              <div className="flex flex-row flex-1 gap-3 xs:gap-4 sm:gap-6 md:gap-10">
                <div className="w-[50%] md:w-[40%] flex flex-col justify-center text-gray-700">
                  {/* Serial Number Badge */}
                  <div
                    className="mb-2 sm:mb-4 md:mb-6 flex items-center justify-center shrink-0 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white font-intermedium text-[10px] sm:text-sm md:text-base"
                    style={{
                      borderRadius: "100px",
                      backgroundColor: "rgb(14, 28, 41)",
                      boxShadow:
                        "rgba(0,0,0,0.09) 0px 1.34px 0.54px -0.625px, rgba(0,0,0,0.086) 0px 3.18px 1.27px -1.25px, rgba(0,0,0,0.082) 0px 5.81px 2.32px -1.875px, rgba(0,0,0,0.08) 0px 9.66px 3.86px -2.5px, rgba(0,0,0,0.07) 0px 15.6px 6.24px -3.125px, rgba(0,0,0,0.063) 0px 25.53px 10.21px -3.75px, rgba(0,0,0,0.04) 0px 43.96px 17.58px -4.375px, rgba(0,0,0,0) 0px 80px 32px -5px",
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-[14px] lg:text-[16px] font-intermedium leading-relaxed line-clamp-4 overflow-hidden text-ellipsis">{project.description}</p>

                  <div className="mt-3 sm:mt-5 md:mt-8 flex w-full">
                    <Button button1="See Blog" button1_url={`/blog/${project.id}`} showButton2={false} mt="0" />
                  </div>
                </div>
                <div className="relative w-[50%] md:w-[60%] h-full rounded-xl overflow-hidden shadow-inner border border-black/5 mt-0">
                  <Image fill src={project.link} alt="image" className="object-cover" unoptimized />
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>


    </div>
  );
}
