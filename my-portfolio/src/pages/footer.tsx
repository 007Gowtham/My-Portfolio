import { Button } from "@/components/sections/ui";
import Image from "next/image";
import FooterSvg from '@/assert/footer/SVG.svg';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Footer() {
  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="bg-[rgba(216,223,229,1)] flex flex-col  rounded-[50px] xs:rounded-[60px] sm:rounded-[70px] md:rounded-[80px] lg:rounded-[90px] xl:rounded-[100px] gap-3 justify-center items-center py-25 w-screen">
      <motion.div variants={itemVariants} className="w-full h-min flex flex-col justify-start items-center max-w-[640px] overflow-visible z-30 p-0 content-center flex-nowrap gap-6 rounded-none">
        <div
          className="flex flex-row justify-center items-center p-[10px] w-min h-min min-w-[85px] min-h-[85px] overflow-visible content-center flex-nowrap gap-0 rounded-full bg-gradient-to-b from-[#0E1C29]/50 to-[#0E1C29] shadow-[0px_1.34px_0.54px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)] animate-bounce-gentle"
        >
          <div className="relative w-16 h-16 rounded-full">
            <Image src={FooterSvg} alt="Image" fill className="object-cover rounded-full" />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full h-auto whitespace-pre-wrap break-words z-20 leading-[1.2] text-center flex flex-col items-center gap-5 px-4">
        {/* ✅ Clamp long heading text to 3 lines */}
        <div className="text-[50px] font-satoshi flex flex-col gap-2 text-center font-light line-clamp-3 max-w-3xl">
          Tell Me About Your Next <span className="block">Creative Project</span>
        </div>

        <p className="text-lg font-inter text-center max-w-2xl">
          Let&apos;s create captivating digital experiences that engage audiences and
          drive meaningful brand interactions across diverse platforms
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button />
      </motion.div>
    </motion.div>
  );
}