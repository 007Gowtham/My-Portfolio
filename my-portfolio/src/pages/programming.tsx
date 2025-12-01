import { MacbookScroll } from "@/components/ui/macbook-scroll";
import JavaIcon from '@/assert/programming/java.svg';
export default function Programming()
{
    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-[rgb(233,237,240,1)]  w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            
          </a>
        }
        src={JavaIcon}
        showGradient={false}
      />
    </div>
  );
}
