"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const page = [
    { name: "Home", route: "/" },
    { name: "Projects", route: "/project" },
    { name: "Contact", route: "/contact" },
  ];

  const goToProfile = () => {
    if (pathname !== "/") {
      window.location.href = "/#profile";
    } else {
      const el = document.getElementById("profile");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center items-end px-4">
      <div
        className="relative z-10 w-full max-w-md sm:max-w-lg"
        style={{
          backdropFilter: "blur(8px)",
          background:
            "linear-gradient(180deg, rgba(14, 28, 41, 0.5) -53%, rgb(14, 28, 41) 100%)",
          borderRadius: "100px",
          boxShadow: `
            rgba(0, 0, 0, 0.28) 0px 0.7px 0.7px -0.6px,
            rgba(0, 0, 0, 0.27) 0px 1.8px 1.8px -1.1px,
            rgba(0, 0, 0, 0.26) 0px 3.6px 3.6px -1.7px,
            rgba(0, 0, 0, 0.24) 0px 6.8px 6.8px -2.3px,
            rgba(0, 0, 0, 0.21) 0px 13.6px 13.6px -2.9px,
            rgba(0, 0, 0, 0.12) 0px 30px 30px -3.5px,
            rgba(255, 255, 255, 0.15) 0px 0px 0px 2px inset
          `,
        }}
      >
        <div className="text-white/80 px-2 sm:px-3 py-2 flex gap-1 sm:gap-4 items-center justify-center">
          {page.map((item) => (
            <Link href={item.route} key={item.name} prefetch>
              <span className="cursor-pointer text-sm sm:text-[16px] font-inter px-2 sm:px-4 py-2 rounded-full transition-transform duration-300 hover:text-white hover:scale-110 opacity-70 hover:opacity-100 flex-shrink-0">
                {item.name}
              </span>
            </Link>
          ))}

          <button
            onClick={goToProfile}
            className="hidden sm:block text-sm sm:text-[16px] font-inter px-2 sm:px-4 py-2 rounded-full transition-transform duration-300 hover:text-white hover:scale-110 opacity-70 hover:opacity-100"
          >
            Profile
          </button>

          <Link href="/demo" prefetch>
            <span
              className="text-white blur-[0.5px] text-sm sm:text-md font-inter px-2 sm:px-4 py-2 rounded-full transition-transform duration-200 hover:scale-105 flex-shrink-0"
              style={{
                borderRadius: "100px",
                background:
                  "linear-gradient(180deg, rgba(94, 120, 143, 0.5) 0%, rgb(14, 28, 41) 229%)",
              }}
            >
              Resume
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
