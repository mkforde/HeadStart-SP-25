import { useState, useEffect } from "react";
import { type Journal, type JournalEntry } from "../../journal/journal";
import { getJournalEntries } from "../../journal/journalFS";
import Preview from "./Preview";

interface PremadePreviewProps {
  journal: Journal;
  workspacePath: string;
  onBack: () => void;
}

function PremadePreview({
  journal,
  workspacePath,
  onBack,
}: PremadePreviewProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        const journalEntries = await getJournalEntries(
          workspacePath,
          journal.id
        );
        setEntries(journalEntries);

        // Set the first entry as active if available
        if (journalEntries.length > 0) {
          setActiveEntry(journalEntries[0]);
        }
      } catch (error) {
        console.error("Error loading journal entries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [journal, workspacePath]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header with back button */}
      <div className="bg-base-200 p-4 flex items-center">
        <button
          className="btn btn-ghost btn-sm mr-4"
          onClick={onBack}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">{journal.name}</h1>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-500">
            No entries found in this journal
          </div>
        </div>
      ) : (
        <div className="flex-1 flex">
          {/* Entry Sidebar */}
          <div className="w-64 bg-base-100 p-4 overflow-y-auto border-r border-base-200">
            <h2 className="text-lg font-semibold mb-4">Journal Entries</h2>
            <div className="space-y-2">
              {entries.map((entry) => (
                <button
                  key={`${entry.date}-${entry.title}`}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeEntry?.date === entry.date
                      ? "bg-primary/20 border-primary/30 border"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveEntry(entry)}
                >
                  <div className="font-medium">{entry.title}</div>
                  <div className="text-sm text-base-content/60">
                    {entry.date}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {activeEntry ? (
              <div className="h-full">
                <div className="p-4 bg-base-100 border-b border-base-200">
                  <h2 className="text-xl font-bold">{activeEntry.title}</h2>
                  <div className="text-sm text-base-content/60">
                    {activeEntry.date}
                  </div>
                </div>
                <Preview markdown={activeEntry.content} className="h-auto" />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-lg text-base-content/60">
                  Select an entry to view its contents
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PremadePreview;
