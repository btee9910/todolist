import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";
import { useNote } from "./NoteContext";

const SectionBlock = ({ title, status }) => {
    const noteContext = useNote();
    const [stickyNotes, setStickyNotes] = useState(noteContext[status])

    useEffect(() => {
        setStickyNotes(noteContext[status]);
    }, [noteContext[status]])

    return (
        <div className="section-block">
            <div>
                <h2 className="section-block-title">{title}</h2>
            </div>

            <div className="section-block-notes">
                <div className="note-block">
                    {status === 'toDo' && noteContext.showForm && <StickyNote note={noteContext.newNote} index={999} newNote={noteContext.showForm} key={999} />}
                    {stickyNotes.map((stickyNote, index) => {
                        return <StickyNote note={stickyNote} index={index} key={index} />
                    })}

                </div>
            </div>

        </div>

    );
}

export default SectionBlock;