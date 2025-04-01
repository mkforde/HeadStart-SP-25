export interface Journal {
    name: string;
    description: string;
    color: string; // This will now be a theme color name like 'primary', 'secondary', etc.
    createdAt: string;
    lastModified: string;
    id: string; // Add a unique identifier
}

// Theme color options that will be available in the color picker
export const themeColors = [
    { name: 'primary', label: 'Primary' },
    { name: 'secondary', label: 'Secondary' },
    { name: 'accent', label: 'Accent' },
    { name: 'neutral', label: 'Neutral' },
    { name: 'info', label: 'Info' },
    { name: 'success', label: 'Success' },
    { name: 'warning', label: 'Warning' },
] as const;

export type ThemeColor = typeof themeColors[number]['name'];

// Function to get the CSS class for a journal card based on its color
export function getJournalColorClass(color: ThemeColor): string {
    return `bg-${color} text-${color}-content`;
}

// Function to get the CSS class for a color swatch in the color picker
export function getColorSwatchClass(color: ThemeColor): string {
    return `bg-${color} hover:bg-${color}-focus`;
}

// getting journals from workspace, Fetching metadata, validating, fixing errors