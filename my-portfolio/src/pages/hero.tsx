import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero/Group.svg"
        alt="grain texture"
        fill
        className="object-cover object-center  opacity-[30px] z-0"
        priority
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-white text-4xl font-bold">Welcome to My Site</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
}
