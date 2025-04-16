import {
  readTextFile,
  writeTextFile,
  mkdir,
  exists,
  readDir,
} from "@tauri-apps/plugin-fs";
import { type Journal, type JournalEntry } from "./journal";
import { readTextFile as readFile } from "@tauri-apps/plugin-fs";

// Sanitize a string to be used as a folder name
function sanitizeFolderName(name: string): string {
  // Replace any non-alphanumeric characters (except spaces) with hyphens
  // Convert spaces to hyphens
  // Convert to lowercase
  // Remove leading/trailing hyphens
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Generate a unique folder name by appending a number if needed
async function generateUniqueFolderName(
  basePath: string,
  name: string
): Promise<string> {
  const sanitizedName = sanitizeFolderName(name);
  let folderName = sanitizedName;
  let counter = 1;

  while (await exists(`${basePath}/${folderName}`)) {
    folderName = `${sanitizedName}-${counter}`;
    counter++;
  }

  return folderName;
}

// Read a journal's metadata from its metadata.json file
export async function readJournalMetadata(
  journalPath: string
): Promise<Journal | null> {
  try {
    const metadataPath = `${journalPath}/metadata.json`;
    if (!(await exists(metadataPath))) {
      return null;
    }

    const metadataContent = await readTextFile(metadataPath);
    return JSON.parse(metadataContent);
  } catch (error) {
    console.error("Error reading journal metadata:", error);
    return null;
  }
}

// Write a journal's metadata to its metadata.json file
export async function writeJournalMetadata(
  journalPath: string,
  metadata: Journal
): Promise<void> {
  try {
    const metadataPath = `${journalPath}/metadata.json`;
    await writeTextFile(metadataPath, JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.error("Error writing journal metadata:", error);
    throw error;
  }
}

// Create a new journal folder with metadata
export async function createJournal(
  workspacePath: string,
  journal: Omit<Journal, "id" | "createdAt" | "lastModified">
): Promise<Journal> {
  try {
    // Generate unique folder name
    const folderName = await generateUniqueFolderName(
      workspacePath,
      journal.name
    );
    const journalPath = `${workspacePath}/${folderName}`;

    // Create journal folder
    await mkdir(journalPath, { recursive: true });

    // Create metadata.json
    const metadata: Journal = {
      ...journal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    await writeJournalMetadata(journalPath, metadata);

    // Create initial journal entry
    const initialEntry = await createNewJournalEntry(metadata, 1);
    await saveJournalEntry(workspacePath, initialEntry);

    return metadata;
  } catch (error) {
    console.error("Error creating journal:", error);
    throw error;
  }
}

// Get all journals from the workspace
export async function getJournals(workspacePath: string): Promise<Journal[]> {
  try {
    const workspaceExists = await exists(workspacePath);

    if (!workspaceExists) {
      await mkdir(workspacePath);
    }

    const entries = await readDir(workspacePath);
    const journals: Journal[] = [];

    for (const entry of entries) {
      // Check if the entry is a directory by checking if it has a metadata.json file
      const metadata = await readJournalMetadata(
        `${workspacePath}/${entry.name}`
      );
      if (metadata) {
        journals.push(metadata);
      }
    }

    return journals;
  } catch (error) {
    console.error("Error getting journals:", error);
    return [];
  }
}

// Update a journal's metadata
export async function updateJournal(
  workspacePath: string,
  journal: Journal
): Promise<void> {
  try {
    const entries = await readDir(workspacePath);
    for (const entry of entries) {
      const metadata = await readJournalMetadata(
        `${workspacePath}/${entry.name}`
      );
      if (metadata && metadata.id === journal.id) {
        await writeJournalMetadata(`${workspacePath}/${entry.name}`, {
          ...journal,
          lastModified: new Date().toISOString(),
        });
        return;
      }
    }
    throw new Error("Journal not found");
  } catch (error) {
    console.error("Error updating journal:", error);
    throw error;
  }
}

// Delete a journal
export async function deleteJournal(
  workspacePath: string,
  journalId: string
): Promise<void> {
  try {
    const entries = await readDir(workspacePath);
    for (const entry of entries) {
      const metadata = await readJournalMetadata(
        `${workspacePath}/${entry.name}`
      );
      if (metadata && metadata.id === journalId) {
        // TODO: Implement directory deletion when Tauri provides the API
        throw new Error("Directory deletion not yet implemented");
      }
    }
    throw new Error("Journal not found");
  } catch (error) {
    console.error("Error deleting journal:", error);
    throw error;
  }
}

// Generate a filename for a journal entry
function generateEntryFilename(
  entry: JournalEntry,
  existingEntries: string[] = []
): string {
  const dateStr = entry.date;
  const baseFilename = `${dateStr}-entry`;

  // Check if we need to add a counter (for multiple entries on the same day)
  const sameDay = existingEntries.filter((name) =>
    name.startsWith(baseFilename)
  );
  const counter = sameDay.length > 0 ? sameDay.length + 1 : 1;

  return `${baseFilename}-${counter}.md`;
}

// Convert JournalEntry to markdown with front matter
function entryToMarkdown(entry: JournalEntry): string {
  return `---
title: ${entry.title}
date: ${entry.date}
---

${entry.content}`;
}

// Parse markdown with front matter into JournalEntry
function markdownToEntry(
  markdown: string,
  journalId: string
): JournalEntry | null {
  try {
    // Extract front matter
    const frontMatterMatch = markdown.match(
      /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    );
    if (!frontMatterMatch) return null;

    const [, frontMatter, content] = frontMatterMatch;

    // Parse front matter
    const titleMatch = frontMatter.match(/title:\s*(.*)/);
    const dateMatch = frontMatter.match(/date:\s*(.*)/);

    if (!titleMatch || !dateMatch) return null;

    return {
      title: titleMatch[1].trim(),
      date: dateMatch[1].trim(),
      content: content.trim(),
      journalId,
    };
  } catch (error) {
    console.error("Error parsing markdown entry:", error);
    return null;
  }
}

// Ensure entries directory exists for a journal
async function ensureEntriesDirectory(journalPath: string): Promise<string> {
  const entriesPath = `${journalPath}/entries`;
  if (!(await exists(entriesPath))) {
    await mkdir(entriesPath, { recursive: true });
  }
  return entriesPath;
}

// Find journal directory by ID
async function findJournalDirectoryById(
  workspacePath: string,
  journalId: string
): Promise<string | null> {
  const entries = await readDir(workspacePath);

  for (const entry of entries) {
    const metadata = await readJournalMetadata(
      `${workspacePath}/${entry.name}`
    );
    if (metadata && metadata.id === journalId) {
      return `${workspacePath}/${entry.name}`;
    }
  }

  return null;
}

/**
 * Save a journal entry to the filesystem
 * @param workspacePath Base workspace path
 * @param entry The entry to save
 */
export async function saveJournalEntry(
  workspacePath: string,
  entry: JournalEntry
): Promise<void> {
  try {
    // Find journal directory
    const journalPath = await findJournalDirectoryById(
      workspacePath,
      entry.journalId
    );
    if (!journalPath) {
      throw new Error(`Journal with ID ${entry.journalId} not found`);
    }

    // Ensure entries directory exists
    const entriesPath = await ensureEntriesDirectory(journalPath);

    // Get existing entries to generate proper filename
    const existingEntries = (await exists(entriesPath))
      ? (await readDir(entriesPath)).map((e) => e.name)
      : [];

    // Generate filename based on date and title
    const filename = generateEntryFilename(entry, existingEntries);

    // Convert to markdown and save
    const markdown = entryToMarkdown(entry);
    await writeTextFile(`${entriesPath}/${filename}`, markdown);

    // Update journal's lastModified date
    const metadata = await readJournalMetadata(journalPath);
    if (metadata) {
      await writeJournalMetadata(journalPath, {
        ...metadata,
        lastModified: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error saving journal entry:", error);
    throw error;
  }
}

/**
 * Get all entries for a specific journal
 * @param workspacePath Base workspace path
 * @param journalId ID of the journal
 */
export async function getJournalEntries(
  workspacePath: string,
  journalId: string
): Promise<JournalEntry[]> {
  try {
    // Find journal directory
    const journalPath = await findJournalDirectoryById(
      workspacePath,
      journalId
    );
    if (!journalPath) {
      throw new Error(`Journal with ID ${journalId} not found`);
    }

    const entriesPath = `${journalPath}/entries`;
    if (!(await exists(entriesPath))) {
      return [];
    }

    const entryFiles = await readDir(entriesPath);
    const entries: JournalEntry[] = [];

    for (const file of entryFiles) {
      if (file.name.endsWith(".md")) {
        const content = await readTextFile(`${entriesPath}/${file.name}`);
        const entry = markdownToEntry(content, journalId);
        if (entry) {
          entries.push(entry);
        }
      }
    }

    // Sort by date (newest first)
    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error getting journal entries:", error);
    return [];
  }
}

/**
 * Get a specific journal entry by date and title
 * (replacing previous getJournalEntry by ID)
 * @param workspacePath Base workspace path
 * @param journalId ID of the journal
 * @param date Date string of the entry to find
 * @param title Title of the entry to find
 */
export async function getJournalEntryByDateAndTitle(
  workspacePath: string,
  journalId: string,
  date: string,
  title: string
): Promise<JournalEntry | null> {
  try {
    const entries = await getJournalEntries(workspacePath, journalId);
    return entries.find((e) => e.date === date && e.title === title) || null;
  } catch (error) {
    console.error("Error getting journal entry:", error);
    return null;
  }
}

/**
 * Get a specific journal entry (replacing previous getJournalEntry by ID)
 * This function now uses date to locate an entry which should be unique enough for most cases
 * @param workspacePath Base workspace path
 * @param journalId ID of the journal
 * @param date Date string of the entry to find
 */
export async function getJournalEntry(
  workspacePath: string,
  journalId: string,
  date: string
): Promise<JournalEntry | null> {
  try {
    const entries = await getJournalEntries(workspacePath, journalId);
    return entries.find((e) => e.date === date) || null;
  } catch (error) {
    console.error("Error getting journal entry:", error);
    return null;
  }
}

/**
 * Gets the next sequential entry number for a journal
 * @param workspacePath Base workspace path
 * @param journalId ID of the journal
 */
export async function getNextEntryNumber(
  workspacePath: string,
  journalId: string
): Promise<number> {
  const entries = await getJournalEntries(workspacePath, journalId);
  return entries.length + 1;
}

/**
 * Creates a new journal entry with auto-populated fields
 * @param journal The journal this entry belongs to
 * @param entryNumber Optional sequential number for the entry
 *
 **/
async function createNewJournalEntry(
  journal: Journal,
  entryNumber?: number
): Promise<JournalEntry> {
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format

  let content = "";

  // If the journal has a template, load it
  if (journal.template) {
    try {
      // Fix the path for templates - use app's asset path instead of absolute path
      // This path should match where template files are stored in the app
      const templatePath = `/src/templates/${journal.template}.md`;
      content = await readFile(templatePath);

      // Remove frontmatter if present in the template
      content = content.replace(/^---[\s\S]*?---\n/, "");
    } catch (error) {
      console.error(`Error loading template ${journal.template}:`, error);
      console.error("Error details:", error);
      // Fallback to empty content if template loading fails
    }
  }

  return {
    title: entryNumber
      ? `Journal #${entryNumber}`
      : `Journal Entry - ${formattedDate}`,
    date: formattedDate,
    content: content,
    journalId: journal.id,
  };
}

/**
 * Updates an existing journal entry
 * @param workspacePath Base workspace path
 * @param entry The updated entry
 * @param originalDate The original date of the entry (used to find the entry to update)
 */
export async function updateJournalEntry(
  workspacePath: string,
  entry: JournalEntry,
  originalDate: string
): Promise<void> {
  try {
    // Find journal directory
    const journalPath = await findJournalDirectoryById(
      workspacePath,
      entry.journalId
    );
    if (!journalPath) {
      throw new Error(`Journal with ID ${entry.journalId} not found`);
    }

    const entriesPath = `${journalPath}/entries`;
    if (!(await exists(entriesPath))) {
      throw new Error(
        `Entries directory for journal ${entry.journalId} not found`
      );
    }

    // Find the entry file by date
    const entryFiles = await readDir(entriesPath);
    let foundFile = null;

    for (const file of entryFiles) {
      if (file.name.endsWith(".md")) {
        const content = await readTextFile(`${entriesPath}/${file.name}`);
        const parsedEntry = markdownToEntry(content, entry.journalId);

        // Match by original date
        if (parsedEntry && parsedEntry.date === originalDate) {
          foundFile = file.name;
          break;
        }
      }
    }

    if (!foundFile) {
      throw new Error(`Entry with date ${originalDate} not found`);
    }

    // Convert to markdown and save
    const markdown = entryToMarkdown(entry);
    await writeTextFile(`${entriesPath}/${foundFile}`, markdown);

    // Update journal's lastModified date
    const metadata = await readJournalMetadata(journalPath);
    if (metadata) {
      await writeJournalMetadata(journalPath, {
        ...metadata,
        lastModified: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error updating journal entry:", error);
    throw error;
  }
}
