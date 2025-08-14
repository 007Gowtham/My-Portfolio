import React, { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { ContactButton } from "@/components/common/buttons";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Reset form
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

        setLoading(false);
        alert("Message sent successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-intermedium font-semibold text-gray-800 mb-6">
                            Get In Touch
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            I'm always interested in hearing about new opportunities and exciting projects.
                            Feel free to reach out if you'd like to collaborate or just want to say hello!
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                                <p className="text-gray-600">contact@example.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                                <p className="text-gray-600">Your City, Country</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <h3 className="text-xl font-intermedium font-semibold text-gray-800 mb-6">
                        Send Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                placeholder="Tell me more about your project..."
                            />
                        </div>

                        <ContactButton
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <Send size={20} />
                            )}
                            {loading ? "Sending..." : "Send Message"}
                        </ContactButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
