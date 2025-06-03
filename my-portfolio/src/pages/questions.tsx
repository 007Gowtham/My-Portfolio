"use client";
import Contactbutton from '@/components/sections/contactbutton';
import Header from '@/components/sections/header';
import Image from 'next/image';
import { useState } from 'react';

export default function Questions() {
    const [openIndex, setOpenIndex] = useState<number | null>(3);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const faqs = [
        {
            question: "What services do you offer?",
            answer: "I specialize in web design, branding, UI/UX, and Framer development, creating modern, user-friendly experiences tailored to your needs"
        },
        {
            question: "Do you provide revisions?",
            answer: "Yes! I offer two free rounds of revisions to ensure the final design meets your vision perfectly. Additional revisions are available if needed"
        },
        {
            question: "How do I start working with you?",
            answer: "Simply reach out through my contact page, and we'll discuss your project, goals, and timeline before getting started"
        },
        {
            question: "What is your pricing structure?",
            answer: "Pricing depends on the project scope. Contact me for a custom quote based on your needs and budget"
        },
        {
            question: "How long does a project take?",
            answer: "Timelines vary based on project complexity, but most designs take 1–3 weeks, while full websites take 3–6 weeks"
        }
    ];
    
    return (
        <div className="bg-[rgba(216,223,229,1)] rounded-[100px] w-full py-16 flex flex-col items-center">
            {/* Header */}
            <Header title='Question' heading='Questions? Answers!' description='Find quick answers to the most common questions about the services offered'/>
            
            {/* Two-column layout */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 px-20">
                {/* Left column - Contact (Static) */}
                <div className="md:sticky md:top-24 md:self-start bg-[#F0F8FF] rounded-3xl px-7 py-5 shadow-sm md:w-90 flex flex-col items-center text-center h-fit">
                    <div className="w-13 h-13 p-3 bg-[#F0F8FF] rounded-lg flex flex-row items-center justify-center gap-2 overflow-visible z-10 shadow-[0px_0.8px_1.4px_-0.875px_rgba(16,49,77,0.14),0px_2.4px_4.3px_-1.75px_rgba(16,49,77,0.13),0px_6.4px_11.5px_-2.625px_rgba(16,49,77,0.11),0px_20px_36px_-3.5px_rgba(16,49,77,0.06)] mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-intermedium text-gray-900 mb-2">Get In Touch Now!</h2>
                    <p className="text-gray-700 mb-6 font-inter">
                        Still have questions? Feel free to get in touch with us today!
                    </p>
                    <Contactbutton title='Ask A Question'/>
                </div>
                
                {/* Right column - FAQs */}
                <div className="flex-1 flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-[#F0F8FF] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
                        >
                            <button
                                className="w-full px-6 py-4 text-gray-800 text-left flex justify-between items-center transition-all duration-200 "
                                onClick={() => toggleAnswer(index)}
                            >
                                <span className="font-intermedium text-gray-800">{faq.question}</span>
                                <svg 
                                    className={`w-5 h-5 transform transition-all duration-300 ease-in-out ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                            </button>
                            
                            {/* Answer with smooth animation */}
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index 
                                        ? 'max-h-96 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div 
                                    className={`px-6 pb-4 font-inter text-gray-700 transition-all duration-500 ease-in-out transform ${
                                        openIndex === index 
                                            ? 'translate-y-0 filter-none' 
                                            : '-translate-y-2 filter blur-sm'
                                    }`}
                                    style={{
                                        filter: openIndex === index ? 'blur(0px)' : 'blur(4px)',
                                        transitionDelay: openIndex === index ? '100ms' : '0ms'
                                    }}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}