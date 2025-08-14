# Project Management Components

This directory contains organized components for managing portfolio projects in the admin section.

## Components Overview

### 1. ProjectsAdmin (Main Component)
The main orchestrator component that manages the state and coordinates between different views.

**Features:**
- Manages view modes (list, create, edit, view)
- Handles project state and navigation
- Coordinates between child components

**Usage:**
```tsx
import { ProjectsAdmin } from '@/components/sections/admin/projects';

export default function AdminPage() {
    return <ProjectsAdmin />;
}
```

### 2. ProjectList
Displays all projects in a grid layout with search, filtering, and action buttons.

**Features:**
- Grid view of all projects
- Search functionality
- Filter by visibility status
- View, Edit, and Delete actions
- Responsive design

**Props:**
```tsx
interface ProjectListProps {
    onEdit: (project: Project) => void;
    onView: (project: Project) => void;
    onDelete: (projectId: number) => void;
    onCreateNew: () => void;
}
```

### 3. ProjectForm
Handles both creating new projects and editing existing ones.

**Features:**
- Form validation
- Image upload handling
- Dynamic fields for services, tools, and values
- Responsive design
- Loading states

**Props:**
```tsx
interface ProjectFormProps {
    project?: Project | null;
    onSave: (project: Project) => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}
```

### 4. ProjectView
Displays project details in a read-only format.

**Features:**
- Comprehensive project information display
- Image galleries
- External links to GitHub and live demo
- Metadata display
- Edit button for quick access

**Props:**
```tsx
interface ProjectViewProps {
    project: Project;
    onBack: () => void;
    onEdit: () => void;
}
```

## Data Structure

### Project Interface
```tsx
interface Project {
    id?: number;
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
    created_at?: string;
    updated_at?: string;
    services: Array<{ id?: number; name: string }>;
    tools: Array<{ id?: number; name: string }>;
    values: Array<{ id?: number; name: string }>;
}
```

## API Integration

The components use the following API endpoints (configured in `@/lib/config`):

- `GET /api/projects/` - Fetch all projects
- `POST /api/projects/` - Create new project
- `PUT /api/projects/{id}/` - Update existing project
- `DELETE /api/projects/{id}/` - Delete project

## Styling

All components use:
- Tailwind CSS for styling
- Responsive design patterns
- Consistent color scheme and spacing
- Custom button animations and hover effects

## State Management

The `ProjectsAdmin` component manages:
- Current view mode (list/create/edit/view)
- Selected project data
- Navigation between different views

## Usage Examples

### Basic Implementation
```tsx
import { ProjectsAdmin } from '@/components/sections/admin/projects';

export default function AdminProjectsPage() {
    return (
        <div className="w-full">
            <ProjectsAdmin />
        </div>
    );
}
```

### Custom Project List
```tsx
import { ProjectList } from '@/components/sections/admin/projects';

export default function CustomProjectList() {
    const handleEdit = (project) => {
        // Custom edit logic
    };

    const handleView = (project) => {
        // Custom view logic
    };

    return (
        <ProjectList
            onEdit={handleEdit}
            onView={handleView}
            onDelete={(id) => console.log('Delete:', id)}
            onCreateNew={() => console.log('Create new')}
        />
    );
}
```

## Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Next.js (for routing and API calls)

## File Structure

```
projects/
├── README.md           # This documentation
├── index.ts           # Component exports
├── types.ts           # TypeScript interfaces
├── ProjectsAdmin.tsx  # Main orchestrator
├── ProjectList.tsx    # Project listing component
├── ProjectForm.tsx    # Create/edit form
└── ProjectView.tsx    # Project detail view
```
