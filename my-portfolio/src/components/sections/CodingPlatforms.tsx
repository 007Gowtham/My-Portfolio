"use client"
import { useFetch } from '@/hooks/useFetch';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';
import { Check } from 'lucide-react';
import { NumberTicker } from '@/components/magicui/number-ticker';

interface CodingPlatform {
  id: number;
  platform_name: string;
  username: string;
  profile_url: string;
  problems_solved: number;
  rating: number;
  rank: string;
  badges: string[];
}

export default function CodingPlatforms() {
  const { data: platforms, loading, error, refetch } = useFetch<CodingPlatform[]>(`${API_CONFIG.BASE_URL}${ENDPOINTS.CODING_PLATFORMS}`);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E1C29] mx-auto mb-2"></div>
          <p className="text-[#0E1C29] font-inter text-sm">Loading platforms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center">
          <p className="text-red-600 font-inter text-sm mb-2">Error loading platforms: {error}</p>
          <button
            onClick={refetch}
            className="bg-[#0E1C29] text-white px-3 py-1 rounded text-xs font-inter hover:bg-[#0E1C29]/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!platforms || platforms.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <p className="text-[#0E1C29] font-inter text-sm">No coding platforms available</p>
      </div>
    );
  }

  return (
    <div className='gap-2 xs:gap-3 font-intermedium text-[#0E1C29] px-2 xs:px-3 sm:px-4 flex flex-col mb-4 xs:mb-5 sm:mb-6 md:mb-7'>
      {platforms.map((platform, index) => (
        <div key={platform.id} className='text-gray-700 text-xs sm:text-[16px] xs:text-sm flex items-center gap-2'>
          <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 rounded-full flex items-center justify-center mt-0.5">
            <Check size={12} className="xs:w-4 xs:h-4 text-[#0E1C29]" />
          </div>
          <div className='flex-1'>{platform.platform_name}</div>
          <div className='font-medium'>
            <NumberTicker value={platform.problems_solved} />+
          </div>
        </div>
      ))}
    </div>
  );
}
