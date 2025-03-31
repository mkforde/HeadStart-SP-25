import { type UserSettings } from './settings';
import { open } from "@tauri-apps/plugin-dialog";
import { getWorkspaceHistory, addWorkspaceToHistory } from './workspaceHistory';
import { useState, useEffect } from 'react';

interface SettingsUIProps {
    isOpen: boolean;
    onClose: () => void;
    settings: UserSettings;
    onSettingsChange: (settings: UserSettings) => void;
}

export default function SettingsUI({ isOpen, onClose, settings, onSettingsChange }: SettingsUIProps) {
    const [recentWorkspaces, setRecentWorkspaces] = useState<string[]>([]);

    useEffect(() => {
        // Load workspace history when component mounts
        loadWorkspaceHistory();
    }, []);

    const loadWorkspaceHistory = async () => {
        const history = await getWorkspaceHistory();
        setRecentWorkspaces(history.recentWorkspaces);
    };

    const handleChange = async (key: keyof UserSettings, value: string | boolean) => {
        if (key === 'workspacePath') {
            // Add the new workspace to history when it changes
            await addWorkspaceToHistory(value as string);
            await loadWorkspaceHistory(); // Reload the history
        }
        onSettingsChange({
            ...settings,
            [key]: value
        });
    };

    const handleWorkspaceSelect = async () => {
        try {
            const selected = await open({
                directory: true,
                multiple: false,
                defaultPath: settings.workspacePath
            });

            if (selected) {
                const workspacePath = selected as string;
                await handleChange('workspacePath', workspacePath);
            }
        } catch (error) {
            console.error('Error selecting workspace:', error);
        }
    };

    return (
        <div className="drawer drawer-end">
            <input id="settings-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />

            {/* Drawer content */}
            <div className="drawer-side">
                <label htmlFor="settings-drawer" className="drawer-overlay" onClick={onClose}></label>
                <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Settings header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Settings</h2>
                    </div>

                    {/* Settings form */}
                    <div className="form-control flex flex-col gap-4">
                        {/* Workspace Section */}
                        <div>
                            <label className="label">
                                <span className="label-text">Workspace Path</span>
                            </label>
                            <div className="flex flex-col gap-2">
                                {/* Workspace Dropdown */}
                                <select
                                    className="select select-bordered w-full"
                                    value={settings.workspacePath}
                                    onChange={(e) => handleChange('workspacePath', e.target.value)}
                                >
                                    <option value={settings.workspacePath}>{settings.workspacePath}</option>
                                    {recentWorkspaces
                                        .filter(path => path !== settings.workspacePath)
                                        .map((path, index) => (
                                            <option key={index} value={path}>
                                                {path}
                                            </option>
                                        ))}
                                </select>

                                {/* Browse Button */}
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={handleWorkspaceSelect}
                                >
                                    Browse...
                                </button>
                            </div>
                        </div>

                        {/* Theme */}
                        <div>
                            <label className="label">
                                <span className="label-text">Theme</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={settings.theme}
                                onChange={(e) => handleChange('theme', e.target.value)}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>

                        {/* Default Journal Color */}
                        <div>
                            <label className="label">
                                <span className="label-text">Default Journal Color</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={settings.defaultJournalColor}
                                onChange={(e) => handleChange('defaultJournalColor', e.target.value)}
                            >
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="accent">Accent</option>
                                <option value="neutral">Neutral</option>
                                <option value="base-100">Base 100</option>
                                <option value="base-200">Base 200</option>
                                <option value="base-300">Base 300</option>
                            </select>
                        </div>

                        {/* Hide Tutorial */}
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Hide Tutorial on Startup</span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={settings.hideTutorial}
                                    onChange={(e) => handleChange('hideTutorial', e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
