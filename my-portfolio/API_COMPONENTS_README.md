# API Components for Portfolio

This document describes the new API components that fetch data from your Django Portfolio API and display it in your Next.js portfolio.

## Overview

The components are designed to separate concerns:
- **Data Fetching**: Each component handles its own API calls using the `useFetch` hook
- **Data Display**: Components render the fetched data with proper loading states and error handling
- **Reusability**: Components can be easily integrated into existing pages

## Components Created

### 1. ProfileData.tsx
Fetches and displays profile information from `/api/profiles/`

**Features:**
- Responsive design (mobile/desktop layouts)
- Displays name, bio, skills, contact info
- Social media links (LinkedIn, GitHub, Instagram)
- Skills display with tags
- Loading and error states with retry functionality

**Usage:**
```tsx
import ProfileData from '@/components/sections/ProfileData';

// In your about page
<ProfileData />
```

### 2. CodingPlatforms.tsx
Fetches and displays coding platform statistics from `/api/coding-platforms/`

**Features:**
- Shows platform names and problems solved
- Uses NumberTicker for animated counters
- Loading and error states
- Compact design for integration

**Usage:**
```tsx
import CodingPlatforms from '@/components/sections/CodingPlatforms';

// In your coding page
<CodingPlatforms />
```

### 3. ProjectsData.tsx
Fetches and displays projects from `/api/projects/`

**Features:**
- Grid layout for projects
- Featured projects section
- Project statistics
- Click navigation to project details
- Loading and error states

**Usage:**
```tsx
import ProjectsData from '@/components/sections/ProjectsData';

// In your projects page
<ProjectsData />
```

### 4. TestimonialsData.tsx
Fetches and displays client testimonials from `/api/testimonials/`

**Features:**
- Star ratings display
- Client information
- Rating distribution chart
- Statistics overview
- Loading and error states

**Usage:**
```tsx
import TestimonialsData from '@/components/sections/TestimonialsData';

// In your testimonials page
<TestimonialsData />
```

### 5. ServicesData.tsx
Fetches and displays services from `/api/services/`

**Features:**
- Featured services with large cards
- Grid layout for all services
- Service statistics
- Icon and image support
- Loading and error states

**Usage:**
```tsx
import ServicesData from '@/components/sections/ServicesData';

// In your services page
<ServicesData />
```

## Core Utilities

### useFetch Hook
A custom React hook that handles API calls with:
- Loading states
- Error handling
- Retry functionality
- TypeScript support

**Usage:**
```tsx
import { useFetch } from '@/hooks/useFetch';

const { data, loading, error, refetch } = useFetch<DataType>(url);
```

### Configuration
Centralized API configuration in `src/lib/config.ts`:

```tsx
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
```

## Integration Examples

### Replace Static Data in About Page
```tsx
// Before (static data)
const skills = ["Html", "Css", "JavaScript", ...];

// After (API-driven)
import ProfileData from '@/components/sections/ProfileData';

export default function About() {
  return (
    <div>
      <ProfileData />
      {/* Other content */}
    </div>
  );
}
```

### Replace Static Data in Coding Page
```tsx
// Before (static data)
<div className='text-gray-700 text-xs sm:text-[16px] xs:text-sm flex items-center gap-2'>
  <div className='flex-1'>Leetcode</div>
  <div className='font-medium'><NumberTicker value={350}/>+</div>
</div>

// After (API-driven)
import CodingPlatforms from '@/components/sections/CodingPlatforms';

<CodingPlatforms />
```

### Replace Static Data in Projects Page
```tsx
// Before (static data)
const initialProjects: Project[] = [...];

// After (API-driven)
import ProjectsData from '@/components/sections/ProjectsData';

export default function Project() {
  return (
    <div>
      <ProjectsData />
    </div>
  );
}
```

## Environment Variables

Set the API base URL in your `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## Error Handling

All components include:
- Loading spinners
- Error messages with retry buttons
- Graceful fallbacks for missing data
- Network error handling

## Styling

Components use your existing design system:
- Tailwind CSS classes
- Consistent color scheme (`#0E1C29`, `#F6FBFF`, etc.)
- Responsive breakpoints
- Font families (Inter, Satoshi, etc.)

## API Endpoints Expected

The components expect these Django API endpoints:

- `GET /api/profiles/` - Profile information
- `GET /api/coding-platforms/` - Coding platform stats
- `GET /api/projects/` - Project portfolio
- `GET /api/testimonials/` - Client testimonials
- `GET /api/services/` - Service offerings

## Benefits

1. **Separation of Concerns**: Data fetching is separate from display logic
2. **Reusability**: Components can be used across different pages
3. **Maintainability**: Easy to update API endpoints or data structure
4. **User Experience**: Loading states and error handling
5. **Type Safety**: Full TypeScript support
6. **Performance**: Efficient data fetching with proper state management

## Next Steps

1. Replace static data in your existing pages with these components
2. Test API connectivity
3. Customize styling if needed
4. Add additional error handling for specific use cases
5. Implement caching if required
