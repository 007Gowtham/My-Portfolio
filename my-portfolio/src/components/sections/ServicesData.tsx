"use client"
import { useFetch } from '@/hooks/useFetch';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';
import Image from 'next/image';
import Button from './button';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  hasImage: boolean;
  bgColor: string;
}

interface ServiceCardProps {
  service: Service;
  isLarge?: boolean;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isLarge = false, className = "" }) => (
  <div className={`shadow-lg rounded-2xl bg-[#F6FBFF] ${className} ${isLarge
    ? 'grid grid-cols-1 md:grid-cols-4 gap-5 p-5'
    : 'flex items-center p-5'
    }`}>
    {service.hasImage && isLarge && (
      <div
        className="relative col-span-1 md:col-span-2 rounded-2xl h-48 md:h-auto"
        style={{
          boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                      0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                      0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                      0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                      0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                      0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
        }}
      >
        <Image
          src={service.image!}
          alt="Service Image"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    )}

    <div className={`flex gap-5 flex-col ${isLarge ? 'col-span-1 md:col-span-2 flex items-center' : ''
      }`}>
      <div
        className={`${service.bgColor} w-12 h-12 md:w-13 md:h-13 relative rounded-full flex justify-center items-center flex-shrink-0`}
        style={{
          boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                      0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                      0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                      0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                      0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                      0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
        }}
      >
        <Image
          src={service.icon}
          alt="Service Icon"
          width={24}
          height={24}
          className="w-6 h-6 md:w-7 md:h-7"
        />
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-intermedium font-medium text-[#0E1C29] mb-3">
          {service.title}
        </h3>
        <p className="text-[#0E1C29]/70 font-inter text-sm md:text-base leading-relaxed">
          {service.description}
        </p>
      </div>

      <Button />
    </div>
  </div>
);

export default function ServicesData() {
  const { data: services, loading, error, refetch } = useFetch<Service[]>(`${API_CONFIG.BASE_URL}${ENDPOINTS.SERVICES}`);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E1C29] mx-auto mb-4"></div>
          <p className="text-[#0E1C29] font-inter">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <p className="text-red-600 font-inter mb-4">Error loading services: {error}</p>
          <button 
            onClick={refetch}
            className="bg-[#0E1C29] text-white px-4 py-2 rounded-lg font-inter hover:bg-[#0E1C29]/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-[#0E1C29] font-inter">No services available</p>
      </div>
    );
  }

  // Separate featured and regular services
  const featuredServices = services.filter(service => service.hasImage);
  const regularServices = services.filter(service => !service.hasImage);

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-95 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-intermedium font-medium text-[#0E1C29] mb-12 text-center">
            Featured Services
          </h2>
          <div className="space-y-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isLarge={true}
                className="w-full"
              />
            ))}
          </div>
        </div>
      )}

      {/* All Services Grid */}
      <div>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-intermedium font-medium text-[#0E1C29] mb-12 text-center">
          All Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="h-full"
            />
          ))}
        </div>
      </div>

      {/* Services Statistics */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">{services.length}</h3>
          <p className="text-[#0E1C29]/70 font-inter">Total Services</p>
        </div>
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">
            {services.filter(s => s.hasImage).length}
          </h3>
          <p className="text-[#0E1C29]/70 font-inter">Featured</p>
        </div>
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">
            {services.filter(s => s.bgColor === 'bg-white').length}
          </h3>
          <p className="text-[#0E1C29]/70 font-inter">Light Theme</p>
        </div>
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">
            {services.filter(s => s.bgColor === 'bg-black').length}
          </h3>
          <p className="text-[#0E1C29]/70 font-inter">Dark Theme</p>
        </div>
      </div>
    </div>
  );
}
