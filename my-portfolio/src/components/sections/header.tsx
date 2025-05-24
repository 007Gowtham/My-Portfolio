import '../../app/globals.css';
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
  return (
   <div className="flex justify-center items-center flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-5">
        <div className="bg-[#F0F8FF] rounded-2xl xs:rounded-3xl sm:rounded-4xl flex p-1 flex-col justify-center items-center">
          <button className="bg-[#F0F8FF]  text-[#0E1C29] px-8 py-1 font-inter  rounded-3xl border border-[#D8DFE5]">
           {title}
          </button>
        </div>
        <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10">
          <div className="text-[#0E1C29]  font-satoshi  font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-[56px] text-center px-2">
           {heading}
          </div>
          <p className="text-[#0E1C29]  font-inter text-center text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-[16px] font-normal px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
            {description}
          </p>
        </div>
      </div>
  );
}