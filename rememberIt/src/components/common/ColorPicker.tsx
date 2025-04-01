import { themeColors } from '../../journal/journal'

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
    label?: string;
    className?: string;
}

export default function ColorPicker({ selectedColor, onColorChange, label, className = '' }: ColorPickerProps) {
    return (
        <div className={`dropdown w-full ${className}`}>
            <div tabIndex={0} role="button" className="btn btn-bordered w-full">
                <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${selectedColor}`}></div>
                    <span>{themeColors.find(c => c.name === selectedColor)?.label}</span>
                </div>
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
                {themeColors.map((color) => (
                    <li key={color.name}>
                        <button
                            className="btn btn-ghost justify-start gap-2"
                            onClick={() => onColorChange(color.name)}
                        >
                            <div className={`w-4 h-4 rounded-full bg-${color.name}`}></div>
                            <span>{color.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
} 