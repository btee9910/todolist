import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";
import { useNote } from "./NoteContext";

const SectionBlock = ( {title, status} ) => {
    const notesContext = useNote();
    const [stickyNotes, setStickyNotes] = useState(notesContext[status])


    useEffect(() => {
        setStickyNotes(notesContext[status]);
    }, [notesContext[status]])
    
    return (
        <div className="section-block">
            <div>
            <h2 className="section-block-title">{title}</h2>
            </div>
            
            <div className="section-block-notes">
                <div className="note-block">
                    {stickyNotes.map((stickyNote, index) => {
                        return <StickyNote note={stickyNote} index={index} key={index}/>
                    })}

                </div>
            </div>

        </div>

    );
}
 
export default SectionBlock;