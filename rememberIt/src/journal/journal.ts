export interface Journal {
    name: string;
    description: string;
    color: string; // This will now be a theme color name like 'primary', 'secondary', etc.
    createdAt: string;
    lastModified: string;
    id: string; // Add a unique identifier
}