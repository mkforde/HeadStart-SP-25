import CreateJournalCard from "./CreateJournalCard";
import JournalCard from "./JournalCard";
import { type Journal } from "../../journal/journal";
import { useState, useEffect, useMemo } from "react";
import SettingsUI from "../../settings/SettingsUI";
import { type UserSettings } from "../../settings/settings";
import { getJournals, createJournal } from "../../journal/journalFS";
import PositiveMessageAlert from "./PositiveMessageAlert";

interface DashboardProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

function Dashboard({ settings, onSettingsChange }: DashboardProps) {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAlert, setShowAlert] = useState(true); // Track alert visibility

  // Load journals from workspace
  useEffect(() => {
    const loadJournals = async () => {
      try {
        const loadedJournals = await getJournals(settings.workspacePath);
        setJournals(loadedJournals);
      } catch (error) {
        console.error("Error loading journals:", error);
      }
    };
    loadJournals();
  }, [settings.workspacePath]);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);

  const handleNewJournal = async (
    newJournal: Omit<Journal, "id" | "createdAt" | "lastModified">
  ) => {
    try {
      const journal = await createJournal(settings.workspacePath, newJournal);
      setJournals((prev) => [...prev, journal]);
    } catch (error) {
      console.error("Error creating journal:", error);
      // TODO: Show error toast to user
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setTimeout(() => {
      setShowAlert(true);
    }, 5 * 60 * 1000); // Show alert again after 5 minutes
  };

  const positiveMessageAlert = useMemo(
    () => (
      <PositiveMessageAlert onClose={handleAlertClose} name={settings.name} />
    ),
    [settings.name]
  );

  return (
    <>
      {showAlert && positiveMessageAlert}
      {/* Main Content */}
      <div className="p-4">
        {/* Header with Settings Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Your Journals</h1>
            <span className="text-base-content/70">
              {journals.length} {journals.length === 1 ? "journal" : "journals"}
            </span>
          </div>
          {!showSettings && (
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => setShowSettings(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Journals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <CreateJournalCard
            onJournalCreate={handleNewJournal}
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
          {journals.map((journal) => (
            <JournalCard
              onOpen={(id) => console.log(id)}
              key={journal.id}
              {...journal}
            />
          ))}
        </div>
      </div>

      {/* Settings UI */}
      <SettingsUI
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
    </>
  );
}

export default Dashboard;
