export interface Journal {
    name: string;
    color: string;
    createdAt: string;
    lastModified: string;
    id: string; // Add a unique identifier
}

function JournalCard({ name, color }: Journal) {
    // on click of div open editor

    return (
        <div className={`pl-2 pr-2 pt-8 pb-8 bg-${color}-50`}>
            <h2>{name}</h2>
        </div>

    );
}

export default JournalCard;