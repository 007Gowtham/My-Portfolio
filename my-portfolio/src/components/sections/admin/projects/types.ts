export interface Project {
    id?: number;
    name: string;
    description: string;
    site_view: boolean;
    github_link: string;
    live_link: string;
    timeline: string;
    main_description: string;
    conclusion: string;
    cover_image: File | null;
    image1: File | null;
    image2: File | null;
    created_at?: string;
    updated_at?: string;
    services: Array<{ id?: number; name: string }>;
    tools: Array<{ id?: number; name: string }>;
    values: Array<{ id?: number; name: string }>;
}

export interface ProjectListItem {
    id: number;
    name: string;
    description: string;
    site_view: boolean;
    cover_image: string | null;
    timeline: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectFormData {
    name: string;
    description: string;
    site_view: boolean;
    github_link: string;
    live_link: string;
    timeline: string;
    main_description: string;
    conclusion: string;
    cover_image: string | null;
    image1: string | null;
    image2: string | null;
    services: Array<{ id?: number; name: string }>;
    tools: Array<{ id?: number; name: string }>;
    values: Array<{ id?: number; name: string }>;
}

export type ViewMode = 'list' | 'create' | 'edit' | 'view';
