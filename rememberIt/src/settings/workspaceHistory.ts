import { exists, BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export interface WorkspaceHistory {
    recentWorkspaces: string[];
    maxHistorySize: number;
}

const defaultWorkspaceHistory: WorkspaceHistory = {
    recentWorkspaces: [],
    maxHistorySize: 10
};

export async function getWorkspaceHistory(): Promise<WorkspaceHistory> {
    try {
        const historyExists = await exists('workspace-history.json', {
            baseDir: BaseDirectory.AppData,
        });

        if (!historyExists) {
            await writeTextFile('workspace-history.json', JSON.stringify(defaultWorkspaceHistory, null, 4), {
                baseDir: BaseDirectory.AppData,
            });
            return defaultWorkspaceHistory;
        }

        const contents = await readTextFile('workspace-history.json', {
            baseDir: BaseDirectory.AppData,
        });
        return JSON.parse(contents);
    } catch (error) {
        console.error('Error reading workspace history:', error);
        return defaultWorkspaceHistory;
    }
}

export async function addWorkspaceToHistory(workspacePath: string): Promise<void> {
    try {
        const history = await getWorkspaceHistory();

        // Remove the path if it already exists (to avoid duplicates)
        history.recentWorkspaces = history.recentWorkspaces.filter(path => path !== workspacePath);

        // Add the new path to the beginning
        history.recentWorkspaces.unshift(workspacePath);

        // Trim the list if it exceeds maxHistorySize
        if (history.recentWorkspaces.length > history.maxHistorySize) {
            history.recentWorkspaces = history.recentWorkspaces.slice(0, history.maxHistorySize);
        }

        await writeTextFile('workspace-history.json', JSON.stringify(history, null, 4), {
            baseDir: BaseDirectory.AppData,
        });
    } catch (error) {
        console.error('Error saving workspace history:', error);
        throw error;
    }
}