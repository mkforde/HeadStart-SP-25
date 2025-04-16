// Template type definition for valid journal templates
export type TemplateName = "muchiri" | "daily" | "evening" | "gratitude";

export interface Journal {
  name: string;
  description: string;
  color: string; // This will now be a theme color name like 'primary', 'secondary', etc.
  createdAt: string;
  lastModified: string;
  id: string; // Add a unique identifier
  template?: TemplateName; // Optional template to use for new entries
}

// Journal entry with front matter
export interface JournalEntry {
  title: string;
  date: string;
  content: string;
  journalId: string; // Reference to parent journal
}
