import { type Journal } from "../../journal/journal";
import { getJournalColorClass, ThemeColor } from "../../colors";

interface JournalCardProps extends Journal {
  onOpen: (journalId: string) => void;
}
// card size was w-36 h-48
function JournalCard({
  name,
  color,
  description,
  id,
  onOpen,
}: JournalCardProps) {
  return (
    <div
      className={`card shadow-2xl w-36 h-48 ${getJournalColorClass(
        color as ThemeColor
      )}`}
    >
      <div className="card-body">
        <h2 className="card-title h-10 h-max-10 text-balance break-normal overflow-y-scroll scrollbar-hide">
          {name}
        </h2>
        <p className="font-thin scrollbar-hide overflow-scroll h-16 h-max-16">
          {description}
        </p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-neutral align-center"
            onClick={() => onOpen(id)}
          >
            Open Journal
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalCard;
