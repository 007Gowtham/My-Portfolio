import Image from "next/image";

Image
export default function Seeprojectbutton()
{
    return (
             <button className="box-border  flex gap-3 justify-center items-center 
               px-6 py-3
               shadow-[inset_0_2px_4px_0_#ffffff,0_0.74px_0.74px_-0.7px_rgba(121,152,189,0.34),0_2.02px_2.02px_-1.4px_rgba(121,152,189,0.33),0_4.43px_4.43px_-2.1px_rgba(121,152,189,0.31),0_9.83px_9.83px_-2.8px_rgba(121,152,189,0.27),0_25px_25px_-3.5px_rgba(121,152,189,0.15)]
               bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)]
               overflow-hidden   rounded-[10px]">
                 <div className="relative w-4 h-4 block">
                 <Image src="/buttons/Vector.svg" fill alt=""/>
                  </div>
               See Project
             </button>
             
    );
}