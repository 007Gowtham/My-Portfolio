"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Button({button1="Contact Me",button2="See Project"}) {
  const router = useRouter();
  
  return (
    <div className="flex gap-7 justify-center mt-10">
      <button 
        className="contact-button  font-intermedium  box-border  text-white flex justify-center items-center gap-3 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px]"
        onClick={() => router.push("/contact")}
      >
        <div className="relative w-3 h-3 block">
          <Image src="/buttons/Group.svg" fill alt="" />      
        </div>
        {button1}
      </button>
      <button 
        className="project-button    font-intermedium box-border  flex gap-3 justify-center items-center px-6 py-3 bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px]"
        onClick={() => router.push("/project")}
      >
        <div className="relative w-4 h-4 block">
          <Image src="/buttons/Vector.svg" fill alt="" />      
        </div>
       {button2}
      </button>

     
    </div>
  );
}