import { Slideshow, type Slide } from "../common/Slideshow";
import { type UserSettings } from "../../settings/settings";

const welcomeSlides: Slide[] = [
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
}

function Tutorial({ settings, onSettingsChange }: TutorialProps) {
  const handleHideTutorialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      hideTutorial: e.target.checked
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-300">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to RememberIt</h1>
          <p className="text-lg text-base-content/80">
            Let's take a quick tour of your new journaling companion
          </p>
        </div>

        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <Slideshow className="bg-accent-content" slides={welcomeSlides} />
        </div>

        {/* Hide tutorial checkbox */}
        <div className="form-control">
          <label className="flex label cursor-pointer justify-center">
            <span className="label-text mr-2">Don't show this tutorial again</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={settings.hideTutorial}
              onChange={handleHideTutorialChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
