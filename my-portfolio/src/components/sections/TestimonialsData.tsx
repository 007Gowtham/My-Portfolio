"use client"
import { useFetch } from '@/hooks/useFetch';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  rating: number;
  project_type: string;
  date_given: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        {renderStars(testimonial.rating)}
        <span className="text-sm text-[#0E1C29]/70 font-inter ml-2">
          {testimonial.rating}/5
        </span>
      </div>
      
      <blockquote className="text-[#0E1C29] font-inter text-base leading-relaxed mb-6 italic">
        "{testimonial.testimonial_text}"
      </blockquote>
      
      <div className="border-t border-[#0E1C29]/20 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-intermedium font-medium text-[#0E1C29] text-lg">
              {testimonial.client_name}
            </h4>
            <p className="text-[#0E1C29]/70 font-inter text-sm">
              {testimonial.client_position} at {testimonial.client_company}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-[#D8DFE5] px-3 py-1 rounded-full text-xs font-inter text-[#0E1C29]">
              {testimonial.project_type}
            </span>
            <p className="text-[#0E1C29]/50 font-inter text-xs mt-1">
              {new Date(testimonial.date_given).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsData() {
  const { data: testimonials, loading, error, refetch } = useFetch<Testimonial[]>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}`);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E1C29] mx-auto mb-4"></div>
          <p className="text-[#0E1C29] font-inter">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <p className="text-red-600 font-inter mb-4">Error loading testimonials: {error}</p>
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

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-[#0E1C29] font-inter">No testimonials available</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-95 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Header with Statistics */}
      <div className="text-center mb-12">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-intermedium font-medium text-[#0E1C29] mb-6">
          What Clients Say
        </h2>
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0E1C29] mb-2">{testimonials.length}</div>
            <p className="text-[#0E1C29]/70 font-inter">Total Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0E1C29] mb-2">{averageRating.toFixed(1)}</div>
            <p className="text-[#0E1C29]/70 font-inter">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="mt-16 bg-[#F6FBFF] p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-intermedium font-medium text-[#0E1C29] mb-6 text-center">
          Rating Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = testimonials.filter(t => t.rating === rating).length;
            const percentage = testimonials.length > 0 ? (count / testimonials.length) * 100 : 0;
            
            return (
              <div key={rating} className="text-center">
                <div className="text-2xl font-bold text-[#0E1C29] mb-2">{rating}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[#0E1C29]/70 font-inter">{count} reviews</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
