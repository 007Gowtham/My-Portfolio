import { CodeBracketIcon, PhoneIcon } from '@heroicons/react/24/solid'; // coding & contact fallback
import Image from 'next/image';
import '../../app/globals.css';
import { TextAnimate } from '../magicui/text-animate';
import { HoverBorderGradient } from '../ui/hover-border-gradient';


export default function Header({
  title,
  heading,
  description,
  className = "",
}: {
  title: string;
  heading: string;
  description: string;
  className?: string;
}) {
  const iconMap = {
    client: '/title/client.svg',
    process: '/title/process.svg',
    question: '/title/questions.svg',
    service: '/title/SVG (4).svg',
  } as const;

  type IconKey = keyof typeof iconMap;
  const lowerTitle = title.toLowerCase();

  const renderIcon = () => {
    if (lowerTitle in iconMap) {
      return (
        <Image src={iconMap[lowerTitle as IconKey]} fill alt={title} />
      );
    }
    if (lowerTitle === 'coding') {
      return <CodeBracketIcon className="w-5 h-5 text-[#0E1C29]" />;
    }
    if (lowerTitle === 'contact') {
      return <PhoneIcon className="w-4 h-4 text-[#0E1C29]" />;
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-5">
      <HoverBorderGradient className="bg-[#F0F8FF] rounded-2xl xs:rounded-3xl sm:rounded-4xl flex p-1 flex-col justify-center items-center">
        <button className="bg-[#F0F8FF] flex justify-center items-center gap-2 text-[#0E1C29] px-4 py-1 font-inter rounded-3xl border border-[#D8DFE5]">
          <div className="relative w-5 h-5 flex items-center justify-center">
            {renderIcon()}
          </div>
          {title}
        </button>
      </HoverBorderGradient>

      <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10">
        <div className="text-[#0E1C29] font-satoshi font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-[56px] text-center px-2">
            
          {heading}
          
        
        </div>
        <p className="text-[#0E1C29] font-inter text-center text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-[16px] font-normal px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
          <TextAnimate animation="blurInUp" by="character" once delay={1}>
          {description}
          </TextAnimate>
        </p>
      </div>
    </div>
  );
}
