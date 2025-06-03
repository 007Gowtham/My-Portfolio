import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#eaf6ff] to-[#f8fbff]">
      {/* 🌌 Sky Atmosphere Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eaf6ff]/30 to-[#f8fbff]/50"></div>
      
      {/* 🌤️ Sun/Light Effect */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-yellow-50/20 to-transparent opacity-40 blur-[80px] z-1" />

      {/* ☁️ Background Clouds (Subtle, Distant) */}
     
      <div className="absolute z-5 top-[25%] right-[10%] w-[600px] h-[350px] animate-cloudMid opacity-40">
        <Image src="/hero/cloud.svg" alt="background cloud" fill className="object-contain" priority />
      </div>

      {/* 🖼️ Main Content Image (Positioned Naturally) */}
      <div className="absolute inset-0 z-15 flex items-center justify-center">
        <div className="relative w-full h-full mt-[65px]">
          <Image 
            src="/hero/Group.svg" 
            alt="main illustration" 
            fill 
            className="object-contain filter drop-shadow-2xl" 
            priority 
          />
        </div>
      </div>

      {/* ☁️ Foreground Clouds (Large, Sharp, Close) */}
      <div className="absolute z-18 bottom-[10%] left-[15%] w-[450px] h-[280px] animate-cloudFast opacity-70">
        <Image src="/hero/cloud.svg" alt="foreground cloud" fill className="object-contain" priority />
      </div>
     

     

      {/* � Light Haze Effect */}
      <div className="absolute inset-0 z-19 bg-white/5 pointer-events-none"></div>

      {/* 🧑‍💼 Text Content (Above everything) */}
      <div className="absolute w-full z-10 mt-[35px]">
        <h1 className="text-[#0F1419] text-[350px] text-center w-full font-bold leading-none font-intermedium tracking-tight drop-shadow-lg">
          Gowtham
        </h1>
      </div>

      {/* ✨ CSS Animations */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(15px); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(12px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-8px); }
        }
        .animate-cloudSlow {
          animation: floatSlow 18s ease-in-out infinite;
        }
        .animate-cloudMid {
          animation: floatMedium 14s ease-in-out infinite;
        }
        .animate-cloudFast {
          animation: floatFast 10s ease-in-out infinite;
        }
        .animate-cloudReverse {
          animation: floatReverse 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}