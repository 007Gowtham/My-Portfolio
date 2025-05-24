
export default function ProccessButton({
    processNo=''}) {
    return(
        <div className=" w-10  font-intermedium h-10 p-[8px_10px] flex flex-row justify-center items-center bg-[#0E1C29] rounded-full overflow-visible gap-0 shadow-[0px_1.34px_0.53px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)] text-white text-lg ">
            {processNo}
      </div>
    );
}