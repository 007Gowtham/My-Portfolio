"use client"
import { useState } from 'react';
import { Mail, User, Headphones } from 'lucide-react';
// Imports from your project structure (assuming they exist)
import { ConfettiButton } from '@/components/magicui/confetti';
import { Header } from '@/components/sections/ui';
import { Navbar, TopNavbar } from '@/components/sections/navigation';

export default function ContactComponent() {
  interface FormDataType {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  } as FormDataType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Integrate with FormSubmit to send emails without a backend
  const sendContactForm = async (data: FormDataType) => {
    try {
      const response = await fetch("https://formsubmit.co/ajax/gowthams200521@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          subject: data.subject,
          message: data.message
        })
      });
      return await response.json();
    } catch (error) {
      throw new Error("Failed to send message. Please try again later.");
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await sendContactForm(formData); // Use the simulated function
        alert('Message sent successfully!');
        setFormData({
            fullName: '',
            email: '',
            subject: '',
            message: '',
        });
    } catch (err) {
        alert(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-screen overflow-x-hidden bg-[rgb(225,232,236)]">
      
      {/* Main Content */}
      <TopNavbar/>
      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-25">
        <Header title="Contact" heading="Reach Me Anytime" description="Have questions or need help? I'm here for you" />

        <div className="max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-25">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">

            {/* Left Column - Contact Options */}
            <div className="space-y-4 sm:space-y-6 max-w-md">
              {/* Email Me Card */}
              <div className="bg-[#F6FBFF] rounded-xl p-10 shadow-xl">
                <div className="flex gap-2 items-center mb-4 sm:gap-3 ">
                  <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)]">
                    <Mail className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                  </div>
                  <div className="text-lg sm:text-2xl text-gray-800 font-intermedium">Email Me</div>
                </div>
                <p className="text-sm sm:text-base font-inter text-gray-600 mb-4 leading-relaxed">
                  Feel free to email me if you have any questions or need more details!
                </p>
                {/* Your Email Address Added Here */}
                <p className="text-sm sm:text-base text-gray-800 font-inter break-all">gowthams200521@gmail.com</p>
              </div>

              {/* Prefer to Call Card - Content Updated */}
              <div className="bg-[#F6FBFF] rounded-xl p-10 shadow-xl">
                <div className="flex gap-2 items-center mb-4 sm:gap-3 ">
                  <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)]">
                    <User className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                  </div>
                  <div className="text-lg sm:text-2xl text-gray-800 font-intermedium">Call Me</div>
                </div>
                <p className="text-sm sm:text-base font-inter text-gray-600 mb-4 leading-relaxed">
                  If you prefer a direct conversation, feel free to give me a call!
                </p>
                <p className="text-sm sm:text-base text-gray-800 font-inter break-all">+91 9500787038</p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <form onSubmit={handleSubmit} className="bg-[#F6FBFF] rounded-xl p-7 shadow-sm">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)]">
                  <Headphones className="h-4 w-4 sm:h-10 sm:w-10 text-gray-700" />
                </div>
              </div>

              <h2 className="text-xl font-intermedium sm:text-2xl text-gray-800 text-center mb-6 sm:mb-8">
                I&apos;d love to help! Let me know how
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-xs sm:text-sm font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Gowtham "
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>

                {/* Email Address Input */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    // Email address added to placeholder
                    placeholder="gowthams200521@gmail.com" 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-intermedium text-gray-700 mb-1 sm:mb-2">
                    Subject Of Interest
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Regarding Project"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-intermedium text-gray-700 mb-1 sm:mb-2">
                    How may we assist you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Give us more info.."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-6 sm:mt-8">
                <ConfettiButton 
                  type="submit" 
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </ConfettiButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  );
}
