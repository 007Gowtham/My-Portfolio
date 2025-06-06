import React from 'react';
import { Check, BarChart3, Play, FileText, Search, Layout, List,
  TreeDeciduous,
  Share2,
  Repeat,
  Code2,
  Layers,
  BrainCircuit,
  BookOpenCheck,
  ContactRound
 } from 'lucide-react';
import Image from 'next/image';
NumberTicker
import Contactbutton from '@/components/sections/contactbutton';
import Header from '@/components/sections/header';
import { NumberTicker } from '@/components/magicui/number-ticker';

const ComparisonSection: React.FC = () => {

 
  const meFeatures = [
    "Custom, high-performance websites",
    "Pixel-perfect UI/UX design", 
    "Built with Framer & Figma expertise",
    "Seamless animations & interactions",
    "Scalable & future-proof solutions",
    "Optimized for speed & conversions",
    "Advanced SEO tactics for enhanced visibility"
  ];

  const bottomServices = [
    { Icon: List, label: "Arrays & Strings" },
    { Icon: TreeDeciduous, label: "Trees" },
    { Icon: Share2, label: "Graphs" },
    { Icon: Repeat, label: "Recursion & Backtracking" },
    { Icon: Layers, label: "Dynamic Programming" },
    { Icon: Code2, label: "Bit Manipulation" },
    { Icon: Search, label: "Searching & Sorting" },
    { Icon: BarChart3, label: "Greedy & Sliding window" },
    { Icon: BrainCircuit, label: "Prefix sum & Hashing" },
    { Icon: BookOpenCheck, label: "Stacks & Queues" }
  ];

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16  xl:px-40 2xl:px-95 bg-[rgba(216,223,229,1)] rounded-[50px] xs:rounded-[60px] sm:rounded-[70px] md:rounded-[80px] lg:rounded-[90px] xl:rounded-[100px] overflow-x-hidden py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
      <Header title='Coding' heading='Crafting Digital Excellence' description='            Building smooth and engaging digital interactions that elevate user satisfaction'/>
      {/* Header */}
      

      {/* Comparison Cards */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-12 2xl:gap-12 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16">
        
        {/* Me Card */}
        <div className="bg-[#F6FBFF] py-5 xs:py-6 sm:py-7 md:py-8 rounded-xl xs:rounded-2xl px-4 xs:px-5 sm:px-6 md:px-7 shadow-sm w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-[370px] lg:max-w-[340px] xl:max-w-[370px] 2xl:max-w-[400px]">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-medium  text-gray-900 text-center  font-intermedium medium mb-4 xs:mb-5 sm:mb-6 md:mb-7">Me</h3>
          <div className="border-t-2 my-4 xs:my-5 sm:my-6 md:my-7 border-dotted border-gray-300"></div>
          <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-7 sm:mb-8">
            {meFeatures.map((feature, index) => (
              <div key={index} className="flex items-start  gap-2 xs:gap-3">
                <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
                  <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
                </div>
                <span className="text-gray-700 text-xs xs:text-sm sm:text-[16px] font-intermedium  leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
         <Contactbutton />
        </div>

        {/* Platforms Card */}
        <div className="bg-[#F6FBFF] w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-[370px] lg:max-w-[340px] xl:max-w-[370px] 2xl:max-w-[400px] rounded-xl xs:rounded-2xl px-4 xs:px-5 sm:px-6 md:px-7 py-5 xs:py-6 sm:py-7 md:py-8 shadow-sm">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl  font-medium text-[#0E1C29] mb-4 xs:mb-5 sm:mb-6 font-intermedium medium  md:mb-8 text-center">Platforms</h3>
          <div className="border-t-2 my-4 xs:my-5 sm:my-6 md:my-7 border-dotted border-gray-300"></div>
          <div className='gap-2 xs:gap-3  font-intermedium  text-[#0E1C29] px-2 xs:px-3 sm:px-4 flex flex-col mb-4 xs:mb-5 sm:mb-6 md:mb-7'>
            <div className='text-gray-700 text-xs sm:text-[16px] xs:text-sm flex items-center gap-2'>
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
              </div>
              <div className='flex-1'>Leetcode</div>
              <div className='font-medium'><NumberTicker value={350}/>+</div>
            </div>
            <div className='flex text-gray-700 text-xs sm:text-[16px] items-center gap-2'>
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
              </div>
              <div className='flex-1'>Geeks for Geeks</div>
              <div className='font-medium'><NumberTicker value={100}/>+</div>
            </div>
            <div className='flex text-gray-700 text-xs sm:text-[16px] items-center gap-2'>
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
              </div>
              <div className='flex-1'>Coding Ninja</div>
              <div className='font-medium'><NumberTicker value={50}/>+</div>
            </div>
            <div className='text-gray-700 text-xs sm:text-[16px] flex items-center gap-2'>
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
              </div>
              <div className='flex-1'>Others</div>
              <div className='font-medium'><NumberTicker value={30}/>+</div>
            </div>
          </div>
          <div className='flex gap-2 xs:gap-3 w-full justify-center'>
            <a href="https://leetcode.com/u/Sdgowtham/" className="box-border contact-button  text-white flex justify-center items-center gap-2 xs:gap-3 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3
              shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)]
              bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)]
              overflow-hidden rounded-[8px] xs:rounded-[10px]">
              <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 block">
                <Image src="/programming/Leetcode.svg" fill alt=""/>
              </div>
            </a>
            <a href="https://www.geeksforgeeks.org/user/727823t7vhi/?_gl=1*1g7ppxx*_up*MQ..&gclid=Cj0KCQjwucDBBhDxARIsANqFdr1Ato7kGs_YAAXl469Z_ZiRAfgKhNCgWXYot8AolC68nf_H1J0sb8saAhSpEALw_wcB" className="box-border contact-button  text-white flex justify-center items-center gap-2 xs:gap-3 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3
              shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)]
              bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)]
              overflow-hidden rounded-[8px] xs:rounded-[10px]">
              <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 block">
                <Image src="/programming/geeks.svg" fill alt=""/>
              </div>
            </a>
            <a  href="https://www.naukri.com/code360/profile/SDGowtham" className="box-border contact-button  text-white flex justify-center items-center gap-2 xs:gap-3 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3
              shadow-[inset_0_1px_2px_0_#b8c1e6,0_0.71px_0.71px_-0.58px_rgba(46,64,128,0.35),0_1.81px_1.81px_-1.17px_rgba(46,64,128,0.34),0_3.62px_3.62px_-1.75px_rgba(46,64,128,0.33),0_6.87px_6.87px_-2.33px_rgba(46,64,128,0.3),0_13.65px_13.65px_-2.92px_rgba(46,64,128,0.26),0_30px_30px_-3.5px_rgba(46,64,128,0.15)]
              bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)]
              overflow-hidden rounded-[8px] xs:rounded-[10px]">
              <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 block">
                <Image src="/programming/Frame.svg" fill alt=""/>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Services */}
      <div className="mt-4 sm:mt-6 md:mt-8 overflow-hidden">
          {/* Programming Languages */}
          <div className="flex overflow-hidden  [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
            <div className="flex animate-scroll-rightToleft gap-5">
              {bottomServices.concat(bottomServices).map((tech, index) => (
                <div 
                  key={index} 
                  className="tech-card flex   bg-[#F6FBFF] px-3 sm:px-4 md:px-6 py-2 sm:py-3 gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl md:rounded-4xl" 
                  style={{ width: "max-content" }}
                >
                  <div className=' grid place-items-center'>
                    <tech.Icon size={20} className="text-[#0E1C29] " />
                    </div>
                  <div className="text-md grid place-items-center  font-normal  font-intermedium  text-[#0E1C29] tracking-wide text-glow">{tech.label}</div>
                </div>
              ))}
            </div>
          </div>
          </div>
    </div>
  );
};

export default ComparisonSection;

function useFetch(arg0: string): { data: any; loading: any; error: any; } {
    throw new Error('Function not implemented.');
  }
