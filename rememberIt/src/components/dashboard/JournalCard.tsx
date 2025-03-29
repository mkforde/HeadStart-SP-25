export interface Journal {
    name: string;
    description: string;
    color: string;
    createdAt: string;
    lastModified: string;
    id: string; // Add a unique identifier
}

function JournalCard({ name, color, description }: Journal) {
    const getColorClass = (color: string) => {
        switch (color) {
            case 'yellow':
                return 'bg-warning text-warning-content';
            case 'blue':
                return 'bg-info text-info-content';
            case 'green':
                return 'bg-success text-success-content';
            case 'purple':
                return 'bg-secondary text-secondary-content';
            case 'pink':
                return 'bg-accent text-accent-content';
            default:
                return 'bg-primary text-primary-content';
        }
    };

    // on click of div open editor

    // think about making the cards responsive and setting a max description length

    return (
        <div className={`card shadow-2xl w-36 h-48 ${getColorClass(color)}`}>
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