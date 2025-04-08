import { themeColors, getColorSwatchClass } from "../../colors";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  label?: string;
  className?: string;
  direction?: "up" | "down";
}

export default function ColorPicker({
  selectedColor,
  onColorChange,
  className = "",
  direction = "down",
}: ColorPickerProps) {
  const dropdownDirectionClass =
    direction === "up" ? "dropdown-top" : "dropdown-bottom";
  return (
    <div className={`dropdown ${dropdownDirectionClass} w-full ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-bordered w-full">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${getColorSwatchClass(
              selectedColor as any
            )}`}
          ></div>
          <span>
            {themeColors.find((c) => c.name === selectedColor)?.label}
          </span>
        </div>
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
        className="dropdown-content mb-1 bg-base-300 rounded-box z-[1] w-full p-2 shadow-2xl max-h-40 overflow-y-auto   gap-1 scrollbar-hide"
      >
        {themeColors.map((color) => (
          <li key={color.name}>
            <button
              className="btn btn-sm btn-block btn-ghost justify-start hover:bg-base-200 focus:bg-base-100"
              onClick={() => onColorChange(color.name)}
            >
              <div
                className={`w-4 h-4 rounded-full ${getColorSwatchClass(
                  color.name
                )}`}
              ></div>
              <span>{color.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
