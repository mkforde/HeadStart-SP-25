import { readTextFile, writeTextFile, mkdir, exists, readDir } from '@tauri-apps/plugin-fs';
import { type Journal } from './journal';

// Sanitize a string to be used as a folder name
function sanitizeFolderName(name: string): string {
    // Replace any non-alphanumeric characters (except spaces) with hyphens
    // Convert spaces to hyphens
    // Convert to lowercase
    // Remove leading/trailing hyphens
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Generate a unique folder name by appending a number if needed
async function generateUniqueFolderName(basePath: string, name: string): Promise<string> {
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
export async function readJournalMetadata(journalPath: string): Promise<Journal | null> {
    try {
        const metadataPath = `${journalPath}/metadata.json`;
        if (!await exists(metadataPath)) {
            return null;
        }

        const metadataContent = await readTextFile(metadataPath);
        return JSON.parse(metadataContent);
    } catch (error) {
        console.error('Error reading journal metadata:', error);
        return null;
    }
}

// Write a journal's metadata to its metadata.json file
export async function writeJournalMetadata(journalPath: string, metadata: Journal): Promise<void> {
    try {
        const metadataPath = `${journalPath}/metadata.json`;
        await writeTextFile(metadataPath, JSON.stringify(metadata, null, 2));
    } catch (error) {
        console.error('Error writing journal metadata:', error);
        throw error;
    }
}

// Create a new journal folder with metadata
export async function createJournal(workspacePath: string, journal: Omit<Journal, 'id' | 'createdAt' | 'lastModified'>): Promise<Journal> {
    try {
        // Generate unique folder name
        const folderName = await generateUniqueFolderName(workspacePath, journal.name);
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
        return metadata;
    } catch (error) {
        console.error('Error creating journal:', error);
        throw error;
    }
}

// Get all journals from the workspace
export async function getJournals(workspacePath: string): Promise<Journal[]> {
    try {

        const workspaceExists = await exists(workspacePath);

        if (!workspaceExists) {
            await mkdir(workspacePath);
        };

        const entries = await readDir(workspacePath);
        const journals: Journal[] = [];

        for (const entry of entries) {
            // Check if the entry is a directory by checking if it has a metadata.json file
            const metadata = await readJournalMetadata(`${workspacePath}/${entry.name}`);
            if (metadata) {
                journals.push(metadata);
            }
        }

        return journals;
    } catch (error) {
        console.error('Error getting journals:', error);
        return [];
    }
}

// Update a journal's metadata
export async function updateJournal(workspacePath: string, journal: Journal): Promise<void> {
    try {
        const entries = await readDir(workspacePath);
        for (const entry of entries) {
            const metadata = await readJournalMetadata(`${workspacePath}/${entry.name}`);
            if (metadata && metadata.id === journal.id) {
                await writeJournalMetadata(`${workspacePath}/${entry.name}`, {
                    ...journal,
                    lastModified: new Date().toISOString(),
                });
                return;
            }
        }
        throw new Error('Journal not found');
    } catch (error) {
        console.error('Error updating journal:', error);
        throw error;
    }
}

// Delete a journal
export async function deleteJournal(workspacePath: string, journalId: string): Promise<void> {
    try {
        const entries = await readDir(workspacePath);
        for (const entry of entries) {
            const metadata = await readJournalMetadata(`${workspacePath}/${entry.name}`);
            if (metadata && metadata.id === journalId) {
                // TODO: Implement directory deletion when Tauri provides the API
                throw new Error('Directory deletion not yet implemented');
            }
        }
        throw new Error('Journal not found');
    } catch (error) {
        console.error('Error deleting journal:', error);
        throw error;
    }
} 