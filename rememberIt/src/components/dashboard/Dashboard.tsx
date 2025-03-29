import CreateJournalCard from "./CreateJournalCard";
import JournalCard, { type Journal } from "./JournalCard";
import { useState } from "react";

function Dashboard() {
    const [journals, setJournals] = useState<Journal[]>([
        {
            "name": "Daily",
            "color": "yellow",
            "description": "Journal your daily life!",
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            id: "1"
        },
        {
            "name": "Life",
            "color": "blue",
            "description": "Journal your academic journey",
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            id: "2"
        },
    ]);

    const handleNewJournal = (newJournal: Omit<Journal, 'id' | 'createdAt' | 'lastModified'>) => {
        const journal: Journal = {
            ...newJournal,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        };
        setJournals(prev => [...prev, journal]);
    };

    return (
        <div className="h-full w-full p-8 bg-base-200">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-base-content">My Journals</h1>
                    <div className="text-base-content/70">
                        {journals.length} {journals.length === 1 ? 'journal' : 'journals'}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <CreateJournalCard onJournalCreate={handleNewJournal} />
                    {journals.map((journal) => (
                        <JournalCard key={journal.id} {...journal} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;