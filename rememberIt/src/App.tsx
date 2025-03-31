import { useState, useEffect } from "react";
import "./App.css";
import Tutorial from "./components/tutorial/Tutorial";
import EditorWithPreview from "./components/editor/EditorWithPreview";
import Dashboard from "./components/dashboard/Dashboard";
import { initializeSettings, saveSettings, type UserSettings } from "./settings/settings";

function App() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  // Initialize settings
  useEffect(() => {
    const init = async () => {
      const initializedSettings = await initializeSettings();
      setSettings(initializedSettings);
      // Check if tutorial should be shown
      if (initializedSettings.hideTutorial) {
        setShowTutorial(false);
      }
    };
    init();
  }, []);

  const handleSettingsChange = async (newSettings: UserSettings) => {
    try {
      await saveSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  function toggleTutorial() {
    setShowTutorial(!showTutorial);
  }

  function ExitButton() {
    return (
      <>
        <button onClick={toggleTutorial} className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </>
    );
  }

  // Don't render anything until settings are loaded
  if (!settings) {
    return null;
  }

  return (
    <main className="w-full h-screen">
      {showTutorial ? (
        <div className="welcome-screen flex flex-col">
          <ExitButton />
          <Tutorial settings={settings} onSettingsChange={handleSettingsChange} />
        </div>
      ) : (
        <div className="w-full h-full">
          <Dashboard settings={settings} onSettingsChange={handleSettingsChange} />
        </div>
      )}
    </main>
  );
}

export default App;

// <EditorWithPreview />