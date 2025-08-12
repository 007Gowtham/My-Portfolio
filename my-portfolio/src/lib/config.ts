export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

export const ENDPOINTS = {
  PROFILES: '/profiles/',
  CODING_PLATFORMS: '/coding-platforms/',
  PROJECTS: '/projects/',
  TESTIMONIALS: '/testimonials/',
  SERVICES: '/services/',
} as const;
