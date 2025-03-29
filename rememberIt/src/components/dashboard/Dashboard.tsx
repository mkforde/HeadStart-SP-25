import CreateJournalCard from "./CreateJournalCard";
import JournalCard, { type Journal } from "./JournalCard";

function Dashboard() {
    let Journals: Journal[] = [

        {
            "name": "Daily",
            "color": "yellow",
            createdAt: "",
            lastModified: "",
            id: ""
        },
        {
            "name": "Life",
            "color": "blue",
            createdAt: "",
            lastModified: "",
            id: ""
        },
    ];

    return (


        <div className="outline h-screen w-screen p-2">
            <h1>Dashboard</h1>

            <h2>Journals</h2>
            <div className="rounded-3xl flex gap-5" >

                <CreateJournalCard />
                {Journals.map(({ name, color }) => (
                    <JournalCard key={name} name={name} color={color} createdAt={""} lastModified={""} id={""} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;