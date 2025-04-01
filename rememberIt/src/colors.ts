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
    switch (color) {
        case 'primary':
            return 'bg-primary text-primary-content';
        case 'secondary':
            return 'bg-secondary text-secondary-content';
        case 'accent':
            return 'bg-accent text-accent-content';
        case 'neutral':
            return 'bg-neutral text-neutral-content';
        case 'info':
            return 'bg-info text-info-content';
        case 'success':
            return 'bg-success text-success-content';
        case 'warning':
            return 'bg-warning text-warning-content';
        default:
            return 'bg-primary text-primary-content';
    }
}

// Function to get the CSS class for a color swatch in the color picker
export function getColorSwatchClass(color: ThemeColor): string {
    switch (color) {
        case 'primary':
            return 'bg-primary hover:bg-primary-focus';
        case 'secondary':
            return 'bg-secondary hover:bg-secondary-focus';
        case 'accent':
            return 'bg-accent hover:bg-accent-focus';
        case 'neutral':
            return 'bg-neutral hover:bg-neutral-focus';
        case 'info':
            return 'bg-info hover:bg-info-focus';
        case 'success':
            return 'bg-success hover:bg-success-focus';
        case 'warning':
            return 'bg-warning hover:bg-warning-focus';
        default:
            return 'bg-primary hover:bg-primary-focus';
    }
} 