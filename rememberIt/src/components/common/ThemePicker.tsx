interface ThemePickerProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  label?: string;
  className?: string;
  direction?: "up" | "down"; // new prop for dropdown direction
}

export default function ThemePicker({
  selectedTheme,
  onThemeChange,
  className = "",
  direction = "down",
}: ThemePickerProps) {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const dropdownDirectionClass =
    direction === "up" ? "dropdown-top" : "dropdown-bottom";

  return (
    <div className={`dropdown ${dropdownDirectionClass} w-full ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-bordered w-full">
        {selectedTheme}
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content mb-1 bg-base-300 rounded-box z-[1] w-full p-2 shadow-2xl max-h-60 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 scrollbar-hide"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:bg-base-200 focus:bg-base-100"
              aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
              value={theme}
              checked={selectedTheme === theme}
              onChange={(e) => onThemeChange(e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
