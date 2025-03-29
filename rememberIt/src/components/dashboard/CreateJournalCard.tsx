import { useState } from "react";
import { type Journal } from "./JournalCard";

interface CreateJournalCardProps {
    onJournalCreate: (journal: Omit<Journal, 'id' | 'createdAt' | 'lastModified'>) => void;
}

function CreateJournalCard({ onJournalCreate }: CreateJournalCardProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "A new journal for your thoughts and ideas...",
        color: "yellow"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onJournalCreate(formData);
        setFormData({
            name: "",
            description: "A new journal for your thoughts",
            color: "yellow"
        });
        const modal = document.getElementById('create_journal_modal') as HTMLDialogElement;
        modal?.close();
    };

    return (
        <>
            <div className="card hover- card-dash bg-neutral-content shadow-2xl w-36 h-48">
                <div className="card-body">
                    <button
                        className="card-title"
                        onClick={() => {
                            const modal = document.getElementById('create_journal_modal') as HTMLDialogElement;
                            modal?.showModal();
                        }}
                    >
                        +
                    </button>
                    <p className="font-thin">Create a new journal</p>
                </div>
            </div>
            <CreateJournalModal
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </>
    );
}

interface CreateJournalModalProps {
    formData: {
        name: string;
        description: string;
        color: string;
    };
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

function CreateJournalModal({ formData, setFormData, onSubmit }: CreateJournalModalProps) {
    return (
        <dialog id="create_journal_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create New Journal</h3>
                <form onSubmit={onSubmit} className="py-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Journal Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter journal name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Enter journal description"
                            value={formData.description}
                            onChange={(e) => setFormData({
                                ...formData,
                                description: e.target.value.slice(0, 32) // limit character input
                            })}
                            maxLength={32}
                        />
                    </div>
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Color Theme</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        >
                            <option value="yellow">Yellow</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="pink">Pink</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={() => {
                            const modal = document.getElementById('create_journal_modal') as HTMLDialogElement;
                            modal?.close();
                        }}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Journal</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default CreateJournalCard;