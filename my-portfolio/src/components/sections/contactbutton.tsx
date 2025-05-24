"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";


export default function Contactbutton({title ='Contact Me'}) {
  const router = useRouter();
  
  return (
    <div>
      <button 
        className="contact-button  font-intermedium box-border w-full  text-white flex justify-center items-center gap-3 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px]"
        onClick={() => router.push("/contact")}
      >
        <div className="relative w-3 h-3 block">
          <Image src="/buttons/Group.svg" fill alt="" />          
        </div>
       {title}
      </button>

      <style jsx>{`
        .contact-button {
          transition: all 0.3s ease-out;
          box-shadow: inset 0 1px 2px 0 #b8c1e6,
                      0 0.71px 0.71px -0.58px rgba(46,64,128,0.35),
                      0 1.81px 1.81px -1.17px rgba(46,64,128,0.34),
                      0 3.62px 3.62px -1.75px rgba(46,64,128,0.33),
                      0 6.87px 6.87px -2.33px rgba(46,64,128,0.3),
                      0 13.65px 13.65px -2.92px rgba(46,64,128,0.26),
                      0 30px 30px -3.5px rgba(46,64,128,0.15);
        }
        
        .contact-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: inset 0 1px 2px 0 #b8c1e6,
                      0 2px 2px -0.58px rgba(46,64,128,0.4),
                      0 4px 4px -1.17px rgba(46,64,128,0.39),
                      0 8px 8px -1.75px rgba(46,64,128,0.38),
                      0 15px 15px -2.33px rgba(46,64,128,0.35),
                      0 25px 25px -2.92px rgba(46,64,128,0.31),
                      0 45px 45px -3.5px rgba(46,64,128,0.25),
                      0 70px 70px -4px rgba(46,64,128,0.2);
        }
        
        .contact-button:active {
          transform: translateY(-1px) scale(1.01);
          transition: all 0.1s ease-out;
        }
      `}</style>
    </div>
  );
}