"use client";
import Image from "next/image";
// icons moved from public to src/assert
import GroupIcon from '@/assert/buttons/Group.svg';
import VectorIcon from '@/assert/buttons/Vector.svg';

import Link from "next/link";

interface ButtonPropsButton{
  button1?:string;
  button1_url?:string;
  button2?:string;
  button2_url?:string;
  showButton2?:boolean;
  mt?:string;
}


export default function Button({ 
    button1 = "Contact Me", 
    button1_url,
    button2 = "See Project", 
    button2_url,
    showButton2 = true,
    mt="10"
}:ButtonPropsButton) {

  
  const secondButtonUrl = button2_url || "/project"; 
  const firstButtonUrl = button1_url || "/contact";

  return (
    <div className={`flex gap-4 sm:gap-7 justify-center scale-90 sm:scale-[0.85]`} style={{ marginTop: mt ? `${Number(mt) * 0.25}rem` : undefined }}>
      {/* Button 1 */}
      {firstButtonUrl.startsWith('http') ? (
        <a href={firstButtonUrl} target="_blank" rel="noopener noreferrer">
          <button 
            className="contact-button font-intermedium box-border text-white flex justify-center items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[8px] sm:rounded-[10px]"
          >
            <div className="relative w-3 h-3 block">
              <Image src={GroupIcon} fill alt="Contact Icon" />      
            </div>
            {button1}
          </button>
        </a>
      ) : (
        <Link 
          href={firstButtonUrl}
          className="contact-button font-intermedium box-border text-white flex justify-center items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[8px] sm:rounded-[10px]"
        >
          <div className="relative w-3 h-3 block">
            <Image src={GroupIcon} fill alt="Contact Icon" />      
          </div>
          {button1}
        </Link>
      )}

      {showButton2 && button2_url && (
        // Renders an anchor tag wrapping a button
        <a href={secondButtonUrl} target={secondButtonUrl.startsWith('http') ? '_blank' : undefined} rel={secondButtonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
          <button 
            // Note: If you use an <a> tag, the onClick on the button is redundant, 
            // as the <a> tag handles the navigation.
            className="project-button font-intermedium box-border flex gap-2 sm:gap-3 justify-center items-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[8px] sm:rounded-[10px]"
          >
            <div className="relative w-4 h-4 block">
              <Image src={VectorIcon} fill alt="Project Icon" />      
            </div>
            {button2}
          </button>
        </a>
      )}
      
      {showButton2 && !button2_url && (
         <Link 
         href={secondButtonUrl}
         className="project-button font-intermedium box-border flex gap-2 sm:gap-3 justify-center items-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[8px] sm:rounded-[10px]"
       >
         <div className="relative w-4 h-4 block">
           <Image src={VectorIcon} fill alt="Project Icon" />      
         </div>
         {button2}
       </Link>
      )}

    </div>
  );
}
