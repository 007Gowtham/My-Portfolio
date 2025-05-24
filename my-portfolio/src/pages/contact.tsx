"use client"
import { useState } from 'react';
import { Mail, User, Headphones } from 'lucide-react';
import Image from 'next/image';
import Footer from './footer';
import Navbar from '@/components/sections/navbar';
import TopNavbar from '@/components/sections/topnavbar';
import Header from '@/components/sections/header';
Image
export default function ContactComponent() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  interface FormData {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="relative w-screen overflow-x-hidden bg-[#F0F8FF]/90">
      {/* Background Grain Effect */}
      <Image
        src="/home/image.svg"
        fill
        alt="grain texture"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
      />
      {/* Main Content */} 
      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20">
      <Header title=' Contact' heading='Reach Me Anytime' description=' Have questions or need help? We re here for you'/>
        {/* Header Section - Responsive */}
       
        {/* Main Content Grid - Fully Responsive */}
        <div className="max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-25">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            
            {/* Left Column - Contact Options */}
            <div className="space-y-4 sm:space-y-6 max-w-md">
              {/* Email Me Card */}
             <div className="bg-[#F6FBFF] rounded-xl p-10  shadow-xl">
                <div className="flex gap-2 items-center mb-4 sm:gap-3 ">
                    <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg  flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)] ">
                    <Mail className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                  </div>
                  <div className="text-lg sm:text-2xl  text-gray-800 font-intermedium">Email Me</div>
                </div>
                <p className="text-sm sm:text-base font-inter  text-gray-600 mb-4  leading-relaxed">
                  Feel free to email me if you have any questions or need more details!
                </p>
                <p className="text-sm sm:text-base text-gray-800 font-inter break-all">portfoy@support.com</p>
              </div>

              {/* Prefer to Call Card */}
             <div className="bg-[#F6FBFF] rounded-xl p-10  shadow-xl">
                <div className="flex gap-2 items-center mb-4 sm:gap-3 ">
                    <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg  flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)] ">
                    <User className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                  </div>
                  <div className="text-lg sm:text-2xl  text-gray-800 font-intermedium">Email Me</div>
                </div>
                <p className="text-sm sm:text-base font-inter  text-gray-600 mb-4  leading-relaxed">
                  Feel free to email me if you have any questions or need more details!
                </p>
                <p className="text-sm sm:text-base text-gray-800 font-inter break-all">portfoy@support.com</p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-[#F6FBFF] rounded-xl p-7 shadow-sm">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg  flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)] ">
                    <Headphones className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                  </div>
              </div>
              
              <h2 className="text-xl   font-intermedium sm:text-2xl  text-gray-800 text-center mb-6 sm:mb-8">
                I'd love to help! Let me know how
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs sm:text-sm  font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ikta Sollork"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>
                
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm  font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="portfoy@support.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>
                
                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm  font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Subject Of Interest
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Regarding Project"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm  font-intermedium text-gray-700 mb-1 sm:mb-2">
                    How may we assist you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Give us more info.."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                  />
                </div>
                
                {/* Submit Button */}
               <button 
                       className="contact-button  font-intermedium box-border w-full  text-white flex justify-center items-center gap-3 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] overflow-hidden rounded-[10px]"
                       
                     >
                       
                      See Your Message
                     </button>
              </div>
            </div>
          </div>
        </div>
      </div>

<Navbar/>
<TopNavbar/>
      {/* Footer Section */}
      <div className="relative z-10 ">
            <Footer/>
      </div>
    </div>
  );
}