import React from "react";
import ServiceCard from "./ServiceCard";

interface Service {
    id: number;
    name: string;
    description: string;
    features: string[];
    icon?: string;
}

interface ServicesGridProps {
    services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
    if (services.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found</p>
                <p className="text-gray-400 mt-2">Check back later for available services</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
}
