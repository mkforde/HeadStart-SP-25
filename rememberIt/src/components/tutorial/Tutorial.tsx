import { Slideshow, type Slide } from "../common/Slideshow";
import { type UserSettings } from "../../settings/settings";
import { open } from "@tauri-apps/plugin-dialog";
import { useState, useEffect } from "react";
import { addWorkspaceToHistory } from "../../settings/workspaceHistory";
import ColorPicker from "../common/ColorPicker";
import ThemePicker from "../common/ThemePicker";

const tutorialSlides: Slide[] = [
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: "Welcome to RememberIt - Your Modern Journaling Companion",
  },
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: "Highly extensible - Customize your journaling experience",
  },
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: "Explore beautiful themes to match your style",
  },
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: "Rich text editing with markdown support",
  },
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: "Plugin system for endless possibilities",
  },
];

interface TutorialProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
  onComplete: () => void;
  isFirstTime: boolean;
}

function Tutorial({
  settings,
  onSettingsChange,
  onComplete,
  isFirstTime,
}: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSelectingWorkspace, setIsSelectingWorkspace] = useState(false);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);

  const handleWorkspaceSelect = async () => {
    setIsSelectingWorkspace(true);
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        defaultPath: settings.workspacePath,
      });

      if (selected) {
        const workspacePath = selected as string;
        await addWorkspaceToHistory(workspacePath);
        onSettingsChange({
          ...settings,
          workspacePath,
        });
      }
    } catch (error) {
      console.error("Error selecting workspace:", error);
    } finally {
      setIsSelectingWorkspace(false);
    }
  };

  const handleThemeChange = (theme: string) => {
    onSettingsChange({
      ...settings,
      theme,
    });
  };

  const handleColorChange = (color: string) => {
    onSettingsChange({
      ...settings,
      defaultJournalColor: color,
    });
  };

  const handleHideTutorialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      hideTutorial: e.target.checked,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      name: e.target.value,
    });
  };

  const handleNext = async () => {
    if (currentStep === 2) {
      // Add current workspace to history before proceeding
      await addWorkspaceToHistory(settings.workspacePath);
    }
    setCurrentStep(currentStep + 1);
  };

  const renderSetupForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Welcome to RememberIt!
            </h2>
            <p className="text-center text-base-content/80">
              Let's set up your workspace and preferences
            </p>
            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={handleNext}>
                Start
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-center">
              Set Your Display Name
            </h2>
            <div className="flex flex-col items-center gap-4">
              <label className="input w-80 bg-base-200">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  placeholder={settings.name || "Enter your name"}
                  onChange={(e) => handleNameChange(e)}
                />
              </label>

              <div className="flex w-80 justify-between flex-row mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={() => setCurrentStep(0)}
                >
                  Back
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Choose Your Workspace
            </h2>
            <p className="text-center text-base-content/80">
              Select where you want to store your journals
            </p>
            <div className="flex flex-col items-center gap-4">
              <label className="input w-full max-w-md">
                <span className="badge badge-ghost badge-s">Path</span>
                <input
                  type="text"
                  className="grow"
                  value={settings.workspacePath}
                  readOnly
                />
              </label>
              <div className="flex gap-2 justify-between w-full max-w-md">
                <button
                  className="btn btn-ghost"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleWorkspaceSelect}
                  disabled={isSelectingWorkspace}
                >
                  {isSelectingWorkspace ? "Selecting..." : "Browse..."}
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Customize Your Experience
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Theme</span>
                </label>
                <ThemePicker
                  selectedTheme={settings.theme}
                  onThemeChange={(theme) => handleThemeChange(theme)}
                  direction="up"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Default Journal Color</span>
                  <span className="text-info">- depends on theme</span>
                </label>
                <ColorPicker
                  selectedColor={settings.defaultJournalColor}
                  onColorChange={(color) => handleColorChange(color)}
                  direction="up"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="btn btn-ghost"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 flex flex-col text-center">
            <h2 className="text-2xl font-bold text-center">Almost Done!</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Don't show this tutorial again
                </span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={settings.hideTutorial}
                  onChange={handleHideTutorialChange}
                />
              </label>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="btn btn-ghost"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button className="btn btn-primary" onClick={onComplete}>
                Start Journaling
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-300">
      <div className="w-full max-w-4xl space-y-8">
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <Slideshow className="bg-accent-content" slides={tutorialSlides} />
        </div>

        {isFirstTime ? (
          renderSetupForm()
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Don't show this tutorial again
                </span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={settings.hideTutorial}
                  onChange={handleHideTutorialChange}
                />
              </label>
            </div>
            <button className="btn btn-primary" onClick={onComplete}>
              Start Journaling
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tutorial;
