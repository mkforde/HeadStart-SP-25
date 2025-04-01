import { type UserSettings } from './settings';
import { open } from "@tauri-apps/plugin-dialog";
import { getWorkspaceHistory, addWorkspaceToHistory } from './workspaceHistory';
import { useState, useEffect } from 'react';
import { themeColors } from '../journal/journal';
import ColorPicker from '../components/common/ColorPicker';

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
                                <div className="dropdown w-full">
                                    <div tabIndex={0} role="button" className="btn btn-bordered w-full">
                                        {settings.workspacePath}
                                        <svg
                                            width="12px"
                                            height="12px"
                                            className="inline-block h-2 w-2 fill-current opacity-60"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 2048 2048">
                                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                                        <li>
                                            <button
                                                className="btn btn-ghost justify-start"
                                                onClick={handleWorkspaceSelect}
                                            >
                                                Browse...
                                            </button>
                                        </li>
                                        {recentWorkspaces
                                            .filter(path => path !== settings.workspacePath)
                                            .map((path, index) => (
                                                <li key={index}>
                                                    <button
                                                        className="btn btn-ghost justify-start"
                                                        onClick={() => handleChange('workspacePath', path)}
                                                    >
                                                        {path}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Theme */}
                        <div>
                            <label className="label">
                                <span className="label-text">Theme</span>
                            </label>
                            <div className="dropdown w-full">
                                <div tabIndex={0} role="button" className="btn btn-bordered w-full">
                                    {settings.theme}
                                    <svg
                                        width="12px"
                                        height="12px"
                                        className="inline-block h-2 w-2 fill-current opacity-60"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 2048 2048">
                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Light"
                                            value="light"
                                            checked={settings.theme === "light"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Dark"
                                            value="dark"
                                            checked={settings.theme === "dark"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Cupcake"
                                            value="cupcake"
                                            checked={settings.theme === "cupcake"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Bumblebee"
                                            value="bumblebee"
                                            checked={settings.theme === "bumblebee"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Emerald"
                                            value="emerald"
                                            checked={settings.theme === "emerald"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Corporate"
                                            value="corporate"
                                            checked={settings.theme === "corporate"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Synthwave"
                                            value="synthwave"
                                            checked={settings.theme === "synthwave"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Retro"
                                            value="retro"
                                            checked={settings.theme === "retro"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Cyberpunk"
                                            value="cyberpunk"
                                            checked={settings.theme === "cyberpunk"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Valentine"
                                            value="valentine"
                                            checked={settings.theme === "valentine"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Halloween"
                                            value="halloween"
                                            checked={settings.theme === "halloween"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Garden"
                                            value="garden"
                                            checked={settings.theme === "garden"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Forest"
                                            value="forest"
                                            checked={settings.theme === "forest"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Aqua"
                                            value="aqua"
                                            checked={settings.theme === "aqua"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Lofi"
                                            value="lofi"
                                            checked={settings.theme === "lofi"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Pastel"
                                            value="pastel"
                                            checked={settings.theme === "pastel"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Fantasy"
                                            value="fantasy"
                                            checked={settings.theme === "fantasy"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Wireframe"
                                            value="wireframe"
                                            checked={settings.theme === "wireframe"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Black"
                                            value="black"
                                            checked={settings.theme === "black"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Luxury"
                                            value="luxury"
                                            checked={settings.theme === "luxury"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Dracula"
                                            value="dracula"
                                            checked={settings.theme === "dracula"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Cmyk"
                                            value="cmyk"
                                            checked={settings.theme === "cmyk"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Autumn"
                                            value="autumn"
                                            checked={settings.theme === "autumn"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Acid"
                                            value="acid"
                                            checked={settings.theme === "acid"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Lemonade"
                                            value="lemonade"
                                            checked={settings.theme === "lemonade"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Night"
                                            value="night"
                                            checked={settings.theme === "night"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Coffee"
                                            value="coffee"
                                            checked={settings.theme === "coffee"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label="Winter"
                                            value="winter"
                                            checked={settings.theme === "winter"}
                                            onChange={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Default Journal Color */}
                        <div>
                            <label className="label">
                                <span className="label-text">Default Journal Color</span>
                                <span className="text-info">- depends on theme</span>
                            </label>
                            <ColorPicker
                                selectedColor={settings.defaultJournalColor}
                                onColorChange={(color) => handleChange('defaultJournalColor', color)}
                            />
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
