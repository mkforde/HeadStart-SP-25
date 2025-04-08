import { exists, BaseDirectory, readTextFile, writeTextFile, mkdir } from '@tauri-apps/plugin-fs';
import { documentDir } from '@tauri-apps/api/path';
import { getWorkspaceHistory } from './workspaceHistory';


export interface UserSettings {
    workspacePath: string;
    theme: string;
    hideTutorial: boolean;
    defaultJournalColor: string;
    lastOpenedJournal: string;
    name: string;
}

const defaultSettings: UserSettings = {
    workspacePath: "",
    theme: "light",
    hideTutorial: false,
    defaultJournalColor: "primary",
    lastOpenedJournal: "journal1",
    name: "User",
};

let currentSettings: UserSettings;

export async function saveSettings(settings: UserSettings): Promise<void> {
    try {
        await writeTextFile('settings.json', JSON.stringify(settings, null, 4), {
            baseDir: BaseDirectory.AppData,
        });
        currentSettings = settings;
    } catch (error) {
        console.error('Error saving settings:', error);
        throw error;
    }
}

export async function isSetupValid(): Promise<boolean> {
    try {
        // Check if settings file exists and is valid
        const settingsExists = await exists('settings.json', {
            baseDir: BaseDirectory.AppData,
        });

        if (!settingsExists) {
            return false;
        }

        // Read and validate settings file contents
        const settingsContents = await readTextFile('settings.json', {
            baseDir: BaseDirectory.AppData,
        });

        try {
            const settings = JSON.parse(settingsContents);
            // Validate that all required fields from UserSettings interface exist and have correct types
            const requiredFields: (keyof UserSettings)[] = Object.keys(defaultSettings) as (keyof UserSettings)[];
            for (const field of requiredFields) {
                if (!(field in settings) || typeof settings[field] !== typeof defaultSettings[field]) {
                    return false;
                }
            }
        } catch (e) {
            console.error('Invalid settings file format:', e);
            return false;
        }

        // Check if workspace history exists and has valid entries
        const workspaceHistory = await getWorkspaceHistory();
        if (!workspaceHistory.recentWorkspaces || !Array.isArray(workspaceHistory.recentWorkspaces) || workspaceHistory.recentWorkspaces.length === 0) {
            return false;
        }

        // Validate each workspace path
        for (const path of workspaceHistory.recentWorkspaces) {
            if (!path || typeof path !== 'string') return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking setup validity:', error);
        return false;
    }
}

export async function initializeSettings(): Promise<UserSettings> {
    try {
        // First check if the directory exists
        const dirExists = await exists('', {
            baseDir: BaseDirectory.AppData
        });

        if (!dirExists) {
            // Create the directory if it doesn't exist
            await mkdir('', {
                baseDir: BaseDirectory.AppData,
                recursive: true
            });
        }

        // Get the document directory for the default workspace path
        const docDir = await documentDir();
        const defaultWorkspacePath = `${docDir}/rememberIt`;

        // Now check for the settings file
        const settingsExists = await exists('settings.json', {
            baseDir: BaseDirectory.AppData,
        });

        if (!settingsExists) {
            // Write default settings if file doesn't exist
            const initialSettings = {
                ...defaultSettings,
                workspacePath: defaultWorkspacePath
            };
            await writeTextFile('settings.json', JSON.stringify(initialSettings, null, 4), {
                baseDir: BaseDirectory.AppData,
            });
            currentSettings = initialSettings;
        } else {
            // Read existing settings
            const contents = await readTextFile('settings.json', {
                baseDir: BaseDirectory.AppData,
            });
            currentSettings = JSON.parse(contents);
        }

        return currentSettings;
    } catch (error) {
        console.error('Error initializing settings:', error);
        // If anything fails, return default settings with document directory
        const docDir = await documentDir();
        currentSettings = {
            ...defaultSettings,
            workspacePath: `${docDir}/rememberIt`
        };
        return currentSettings;
    }
}

export function getSettings(): UserSettings {
    return currentSettings;
}


