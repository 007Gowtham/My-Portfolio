import { motion } from "framer-motion";
import { Button, Header } from "@/components/sections/ui";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const processData = [
  {
    processNo: "01",
    title: "Let's Get In Touch",
    description: "Start by reaching out through our contact page. Fill out the form or book a call to discuss your project.",
    step: "Step 1"
  },
  {
    processNo: "02",
    title: "Understand Requirements",
    description: "We'll analyze your goals and create a custom plan tailored to your project needs.",
    step: "Step 2"
  },
  {
    processNo: "03",
    title: "Design & Develop",
    description: "Our team will begin designing and developing the perfect digital solution for you.",
    step: "Step 3"
  },
  {
    processNo: "04",
    title: "Launch & Support",
    description: "After launch, we offer ongoing support to ensure everything runs smoothly.",
    step: "Step 4"
  }
];

export default function Process() {
  return (
    <div className="w-full h-auto py-10 xl:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1280px] px-7 sm:px-6 lg:px-10 xl:px-16 2xl:px-40">
        <Header
          title="Process"
          heading="Crafting Digital Excellence"
          description="Building smooth and engaging digital interactions that elevate user satisfaction"
        />

        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {processData.map((data, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              className="flex flex-col gap-3 w-full rounded-[20px] px-5 py-7"
              style={{
                backgroundColor: "rgb(246, 251, 255)",
                boxShadow:
                  "rgba(16, 49, 77, 0.137) 0px 0.597px 0.597px -0.875px, rgba(16, 49, 77, 0.13) 0px 1.811px 1.811px -1.75px, rgba(16, 49, 77, 0.114) 0px 4.787px 4.787px -2.625px, rgba(16, 49, 77, 0.06) 0px 15px 15px -3.5px",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center shrink-0 w-10 h-10 text-white font-intermedium text-base"
                style={{
                  borderRadius: "100px",
                  backgroundColor: "rgb(14, 28, 41)",
                  boxShadow:
                    "rgba(0,0,0,0.09) 0px 1.34px 0.54px -0.625px, rgba(0,0,0,0.086) 0px 3.18px 1.27px -1.25px, rgba(0,0,0,0.082) 0px 5.81px 2.32px -1.875px, rgba(0,0,0,0.08) 0px 9.66px 3.86px -2.5px, rgba(0,0,0,0.07) 0px 15.6px 6.24px -3.125px, rgba(0,0,0,0.063) 0px 25.53px 10.21px -3.75px, rgba(0,0,0,0.04) 0px 43.96px 17.58px -4.375px, rgba(0,0,0,0) 0px 80px 32px -5px",
                }}
              >
                {data.processNo}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3">
                <h4 className="font-intermedium text-xl sm:text-2xl leading-snug text-[#0E1C29]">
                  {data.title}
                </h4>
                <p className="font-inter text-base sm:text-lg leading-relaxed text-[#0E1C29]">
                  {data.description}
                </p>
              </div>
              <div className="border-t-2 border-dotted border-gray-300"></div>


              {/* Step badge */}
              <div className="flex justify-end">
                <span
                  className="font-inter font-medium text-sm px-3 py-1 text-[#0E1C29]"
                  style={{
                    backgroundColor: "rgb(216, 223, 229)",
                    borderRadius: "100px",
                  }}
                >
                  {data.step}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Button />
      </div>
    </div>
  );
}