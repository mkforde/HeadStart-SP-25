import { useState, useEffect } from "react";
import { type Journal } from "../../journal/journal";
import { type ThemeColor } from "../../colors";
import ColorPicker from "../common/ColorPicker";
import { type UserSettings } from "../../settings/settings";

interface CreateJournalCardProps {
    onJournalCreate: (journal: Omit<Journal, 'id' | 'createdAt' | 'lastModified'>) => void;
    settings: UserSettings;
    onSettingsChange: (settings: UserSettings) => void;
}

function CreateJournalCard({ onJournalCreate, settings }: CreateJournalCardProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "A new journal for your thoughts",
        color: settings.defaultJournalColor as ThemeColor
    });

    // Update form data when settings change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            color: settings.defaultJournalColor as ThemeColor
        }));
    }, [settings.defaultJournalColor]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onJournalCreate(formData);
        setFormData({
            name: "",
            description: "A new journal for your thoughts",
            color: settings.defaultJournalColor as ThemeColor
        });
        const modal = document.getElementById('create_journal_modal') as HTMLDialogElement;
        modal?.close();
    };

    return (
        <>
            <div className="card hover- card-dash bg-neutral-content shadow-2xl w-36 h-48">
                <div className="card-body">
                    <button
                        className="card-title text-neutral"
                        onClick={() => {
                            const modal = document.getElementById('create_journal_modal') as HTMLDialogElement;
                            modal?.showModal();
                        }}
                    >
                        +
                    </button>
                    <p className="font-thin text-neutral">Create a new journal</p>
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
        color: ThemeColor;
    };
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

function CreateJournalModal({ formData, setFormData, onSubmit }: CreateJournalModalProps) {
    const handleColorChange = (color: string) => {
        setFormData({ ...formData, color: color as ThemeColor });
    };

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
                            <span className="text-info">- this color changes with the theme</span>
                        </label>
                        <div onClick={(e) => e.preventDefault()}>
                            <ColorPicker
                                selectedColor={formData.color}
                                onColorChange={handleColorChange}
                            />
                        </div>
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