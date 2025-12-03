import { Button, Header } from "@/components/sections/ui";

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
    <div className="w-screen  h-auto py-10 flex flex-col px-4 2xl:px-96  xl:px-40 xl:py-20  justify-center">
      <Header title="Process" heading="Crafting Digital Excellence" description="Building smooth and engaging digital interactions that elevate user satisfaction" />

      {/* Grid-based cards using map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4  p-2 h-auto w-full rounded-2xl">
        {processData.map((data, index) => (
          <div
            key={index}
            className="bg-[#F6FBFF] shadow-xl border-b rounded-2xl p-5 flex gap-5 flex-col"
          >
            <div className="w-10 h-10 font-intermedium p-[8px_10px] flex flex-row justify-center items-center bg-[#0E1C29] rounded-full overflow-visible gap-0 shadow-[0px_1.34px_0.53px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)] text-white text-lg">
              {data.processNo}
            </div>
            <div className="flex  flex-col gap-4 text-black">
              <div className="text-xl sm:text-2xl font-intermedium  text-[#0E1C29]">{data.title}</div>
              <p className="text-base font-inter sm:text-lg text-[#0E1C29]">
                {data.description}
              </p>
            </div>
            <div className="border-t-2 border-dotted border-gray-300"></div>
            <div className="flex justify-end items-center">
              <div className="flex font-inter  justify-end text-[#0E1C29] bg-[#D0D7DD] rounded-4xl px-2 py-1 font-medium  items-center text-sm">
                {data.step}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button />
    </div>
  );
}