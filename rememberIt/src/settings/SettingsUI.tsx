import { type UserSettings } from './settings';

interface SettingsUIProps {
    isOpen: boolean;
    onClose: () => void;
    settings: UserSettings;
    onSettingsChange: (settings: UserSettings) => void;
}

export default function SettingsUI({ isOpen, onClose, settings, onSettingsChange }: SettingsUIProps) {
    const handleChange = (key: keyof UserSettings, value: string | boolean) => {
        onSettingsChange({
            ...settings,
            [key]: value
        });
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
                        {/* Workspace Path */}
                        <div>
                            <label className="label">
                                <span className="label-text">Workspace Path</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={settings.workspacePath}
                                onChange={(e) => handleChange('workspacePath', e.target.value)}
                            />
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
