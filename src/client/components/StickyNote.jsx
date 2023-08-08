import crossIcon from '../../../public/cross.png';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StickyNote = ({id, priority, stat}) => {
    const [status, setStatus] = useState('toDo');
    const [stickyNote, setStickyNote] = useState({});
    const [updated, setUpdated] = useState(false);
    const [time, setTime] = useState();

    const fetchStickyNotes = () => {
        axios(`http://localhost:3000/note/${id}`
        ).then((response) => {
            const date = new Date(response.data.updatedAt);
            setTime(new Intl.DateTimeFormat('en-US', {
                timeStyle: "medium",
                dateStyle: "short",
            }).format(date));
            if (response.data.updatedAt !== response.data.createdAt) setUpdated(true);
            setStickyNote(response.data);
        });
    };

    useEffect( fetchStickyNotes, []);

    // update status
    useEffect(() => {
      setStatus(stat);
    }, [stat])
    

    const handleClick = () => {
        console.log('hello World');
    }




    return (
        <div className="stickynote">
            <div id='cross-icon'>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className='note-section'>
                <div>
                    <h2 className='sticky-title'>{stickyNote.title}</h2>
                </div>
                <div id='sticky-note'>
                    <p>{stickyNote.note}</p>
                </div>
                <div id='bottom-note'>
                   
                    <div id='sticky-button' className='hide'>
                        {status === 'To Do'? <div><Button className='button-style' size='small' variant="outlined" startIcon={<PauseIcon/>}>Pause</Button><Button className='button-style' size='small' variant="outlined" startIcon={<DoneIcon/>}>Complete</Button></div>
                        : status === 'Completed'? <Button className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon/>}>Restore</Button>
                        : status === 'On Hold'? <Button className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon/>}>Restore</Button>
                        : <Button className='button-style' size='small' variant="outlined" startIcon={<EditNoteIcon/>}>Update</Button>}
                    </div>
                    <div className='date'>
                        <p>
                        {status === 'Completed'? 'Completed':
                        status === 'On Hold'? 'Paused':
                        status === 'To Do' && !updated ? 'Created':
                        'Updated' } on {time}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default StickyNote;