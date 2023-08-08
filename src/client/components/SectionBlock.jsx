import { useState } from "react";
import StickyNote from "./stickyNote";

const SectionBlock = ( {title} ) => {
    const [stickyNotes, setStickyNotes] = useState([{id: '64cb6215904377d6d0f0c648', priority: 'Medium' },
                                                    {id: '64cb6248904377d6d0f0c64d', priority: 'High' },
                                                    {id: '64cb6750397af6cb364d13fb', priority: 'Medium' },
                                                    {id: '64cb6ca90ec9bef41a93a15a', priority: 'High' },
                                                    {id: '64cb69134e7956e7b0c96537', priority: 'Medium' },
                                                    {id: '64d19b92bc50e4204403978b', priority: 'medium' },
                                                    {id: '64d19c2bbc50e4204403978d', priority: 'Medium' },
                                                    {id: '64d1971cb1f1b8d9480fc293', priority: 'Low' }])

    // useEffect(() => {
    //     setStickyNotes(title)
    // }, [title])
    
    
    return (
        <div className="section-block">
            <div>
            <h2 className="section-block-title">{title}</h2>
            </div>
            
            <div>
                <div className="note-block">
                    {stickyNotes.map((stickyNote, index) => {
                        return <StickyNote id={stickyNote.id} priority={stickyNote.priority} stat={title} key={index}/>
                    })}

                </div>
            </div>

        </div>

    );
}
 
export default SectionBlock;