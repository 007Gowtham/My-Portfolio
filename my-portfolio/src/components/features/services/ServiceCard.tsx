import React from "react";
import { CheckCircle } from "lucide-react";

interface ServiceCardProps {
    service: {
        id: number;
        name: string;
        description: string;
        features: string[];
        icon?: string;
    };
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Service Header */}
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {service.icon ? (
                        <img src={service.icon} alt={service.name} className="w-8 h-8" />
                    ) : (
                        <span className="text-white text-2xl font-bold">
                            {service.name.charAt(0)}
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-intermedium font-semibold text-gray-800">
                    {service.name}
                </h3>
            </div>

            {/* Service Description */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {service.description}
            </p>

            {/* Service Features */}
            <div className="space-y-3">
                <h4 className="font-medium text-gray-800 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-6 text-center">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                </button>
            </div>
        </div>
    );
}
