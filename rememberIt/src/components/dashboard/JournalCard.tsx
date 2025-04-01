import { type Journal, type ThemeColor } from "../../journal/journal";
import { getJournalColorClass } from "../../journal/journal";

function JournalCard({ name, color, description }: Journal) {
    return (
        <div className={`card shadow-2xl w-36 h-48 ${getJournalColorClass(color as ThemeColor)}`}>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="font-thin">{description}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-neutral">Open Journal</button>
                </div>
            </div>
        </div>
    );
}

export default JournalCard;