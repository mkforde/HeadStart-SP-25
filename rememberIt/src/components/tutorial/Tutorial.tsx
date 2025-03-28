import { Slideshow, type Slide } from "../common/Slideshow";

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

function Tutorial() {
  return (
    <div className="welcome-screen min-h-screen flex flex-col items-center justify-center p-4 bg-base-100">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to RememberIt</h1>
          <p className="text-lg text-base-content/80">
            Let's take a quick tour of your new journaling companion
          </p>
        </div>
        
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <Slideshow slides={welcomeSlides} />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
