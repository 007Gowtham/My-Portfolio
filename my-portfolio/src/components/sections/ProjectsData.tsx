"use client"
import { useFetch } from '@/hooks/useFetch';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url: string;
  live_url: string;
  start_date: string;
  end_date: string;
  status: string;
  category: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick: (projectId: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick }) => (
  <div
    key={index}
    className="custom-card bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
    onClick={() => onProjectClick(project.id)}
  >
    <div className="relative shadow-xl rounded-xl sm:rounded-2xl w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 z-10">
      <Image
        src="/project/p1.svg" // Default image, you can add image field to your API
        alt={project.title}
        fill
        className="object-cover rounded-xl sm:rounded-2xl"
      />
      {project.featured && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}
    </div>
    <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
      <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-inter font-normal w-full text-[#0E1C29]/50">
        {project.title}
      </h3>
      <h3 className="flex w-full items-start relative justify-end">
        <Image 
          src="/project/arrow.svg" 
          alt="" 
          width={20} 
          height={20}
          className="xs:w-[22px] xs:h-[22px] sm:w-[25px] sm:h-[25px] md:w-[28px] md:h-[28px] lg:w-[30px] lg:h-[30px] absolute right-0 top-0 hover:translate-x-1 transition-transform duration-200" 
        />
      </h3>
    </div>
  </div>
);

export default function ProjectsData() {
  const router = useRouter();
  const { data: projects, loading, error, refetch } = useFetch<Project[]>(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROJECTS}`);

  const handleProjectClick = (projectId: number) => {
    router.push(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E1C29] mx-auto mb-4"></div>
          <p className="text-[#0E1C29] font-inter">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <p className="text-red-600 font-inter mb-4">Error loading projects: {error}</p>
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

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-[#0E1C29] font-inter">No projects available</p>
      </div>
    );
  }

  // Separate featured and regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 2xl:px-95 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-intermedium font-medium text-[#0E1C29] mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xs:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-intermedium font-medium text-[#0E1C29] mb-8 text-center">
          All Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xs:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      </div>

      {/* Project Statistics */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">{projects.length}</h3>
          <p className="text-[#0E1C29]/70 font-inter">Total Projects</p>
        </div>
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">
            {projects.filter(p => p.status === 'completed').length}
          </h3>
          <p className="text-[#0E1C29]/70 font-inter">Completed</p>
        </div>
        <div className="bg-[#F6FBFF] p-6 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#0E1C29] mb-2">
            {projects.filter(p => p.status === 'in_progress').length}
          </h3>
          <p className="text-[#0E1C29]/70 font-inter">In Progress</p>
        </div>
      </div>
    </div>
  );
}
