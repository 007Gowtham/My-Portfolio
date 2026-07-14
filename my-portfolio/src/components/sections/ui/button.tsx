"use client";
import Image from "next/image";
// icons moved from public to src/assert
import GroupIcon from '@/assert/buttons/Group.svg';
import VectorIcon from '@/assert/buttons/Vector.svg';
import { useRouter } from "next/navigation";

interface ButtonPropsButton{
  button1?:string;
  button2?:string;
  button2_url?:string;
  mt?:string;
}


export default function Button({ 
    button1 = "Contact Me", 
    button2 = "See Project", 
    button2_url,
    mt="10"
  
}:ButtonPropsButton) {
  const router = useRouter();
  
  const secondButtonUrl = button2_url || "/project"; 

  return (
    <div className={`flex gap-7 justify-center mt-${mt} scale-[0.85]`}>
      {/* Button 1: Always present, uses Next.js router for internal navigation */}
      <button 
        className="contact-button font-intermedium box-border text-white flex justify-center items-center gap-3 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px]"
        onClick={() => router.push("/contact")}
      >
        <div className="relative w-3 h-3 block">
          <Image src={GroupIcon} fill alt="Contact Icon" />      
        </div>
        {button1}
      </button>

      {button2_url && (
        // Renders an anchor tag wrapping a button
        <a href={secondButtonUrl} target={secondButtonUrl.startsWith('http') ? '_blank' : undefined} rel={secondButtonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
          <button 
            // Note: If you use an <a> tag, the onClick on the button is redundant, 
            // as the <a> tag handles the navigation.
            className="project-button font-intermedium box-border flex gap-3 justify-center items-center px-6 py-3 bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px]"
          >
            <div className="relative w-4 h-4 block">
              <Image src={VectorIcon} fill alt="Project Icon" />      
            </div>
            {button2}
          </button>
        </a>
      )}
      
      {/* If button2_link is falsy (e.g., passed as false or not present), render button 2 as a standard button with router push */}
      {!button2_url && (
         <button 
         className="project-button font-intermedium box-border flex gap-3 justify-center items-center px-6 py-3 bg-[linear-gradient(126deg,rgba(94,120,143,0.5)_-44%,rgba(240,248,255,0.9)_55%)] overflow-hidden rounded-[10px]"
         onClick={() => router.push(secondButtonUrl)} // Uses router for internal path
       >
         <div className="relative w-4 h-4 block">
           <Image src={VectorIcon} fill alt="Project Icon" />      
         </div>
         {button2}
       </button>
      )}

    </div>
  );
}
