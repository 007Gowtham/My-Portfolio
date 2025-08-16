export interface Testimonial {
    id?: number;
    name: string;
    linkedin_link: string;
    description: string;
    image: File | null;
    created_at?: string;
    updated_at?: string;
}

export interface TestimonialListItem {
    id: number;
    name: string;
    linkedin_link: string;
    description: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export type TestimonialViewMode = 'list' | 'create' | 'edit' | 'view';
