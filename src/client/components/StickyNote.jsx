import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNote } from './NoteContext';
import axiosConfig from '../config/axios';

const StickyNote = ({note, index}) => {
    const notesContext = useNote();
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [noteBox, setNoteBox] = useState(note.note);
    const [time, setTime] = useState('');
    const convertTime = () => {

        const date = new Date(note.updatedAt);
        setTime(new Intl.DateTimeFormat('en-US', {
            dateStyle: "short", 
            timeStyle: "short",
        }).format(date));
        if (note.updatedAt !== note.createdAt) setUpdated(true);
    };

    useEffect(() => {
        setTitle(note.title);
        setNoteBox(note.note);
        convertTime();
     }, [note]);


    const handlePause = (e) => {
        e.preventDefault();
        axiosConfig.put(`note/${note._id}`, {status: 'On Hold'})
        .then((response) => {
            if (response.status === 200) {
                let tempNote = [...notesContext.toDo];
                tempNote.splice(index, 1);
                notesContext.setToDo(tempNote);
                notesContext.setOnHold([...notesContext.onHold, response.data.updatedNote]);
            };
        });
    };

    const handleComplete = (e) => {
        e.preventDefault();
        axiosConfig.put(`note/${note._id}`, {status: 'Completed'})
        .then((response) => {
            if (response.status === 200) {
                let tempNote = [...notesContext.toDo];
                tempNote.splice(index, 1);
                notesContext.setToDo(tempNote);
                notesContext.setCompleted([...notesContext.completed, response.data.updatedNote]);
            };
        });
    };

    const handleRestore = (e) => {
        e.preventDefault();
        let currentStatus = note.status;
        axiosConfig.put(`note/${note._id}`, {status: 'To Do'})
        .then((response) => {
            if (response.status === 200) {
                let tempNote = [];
                if (currentStatus === 'On Hold') {
                    tempNote = [...notesContext.onHold];
                    tempNote.splice(index, 1);
                    notesContext.setOnHold([...tempNote]);
                } else {
                    tempNote = [...notesContext.completed];
                    tempNote.splice(index, 1);
                    notesContext.setCompleted([...tempNote]);
                }

                notesContext.setToDo([...notesContext.toDo, response.data.updatedNote]);
            };
        });
    };

    const handleDelete = (e) => { 
        e.preventDefault();
        // let currentStatus = note.status;
        // axiosConfig.delete(`note/${note._id}`)
        // .then((response) => {
        //     console.log(response.data.message);
        //     let tempNote = [];
        //     if (currentStatus === 'To Do') {
        //         console.log('hehe')
        //         tempNote = notesContext.toDo;
        //         tempNote.splice(index, 1);
        //         notesContext.setToDo([...tempNote]);
        //     } else if (currentStatus === 'On Hold') {
        //         tempNote = notesContext.onHold;
        //         tempNote.splice(index, 1);
        //         notesContext.setOnHold([...tempNote]);
        //     } else {
        //         tempNote = notesContext.completed;
        //         tempNote.splice(index, 1);
        //         notesContext.setCompleted([...tempNote]);
        //     };
        // });
    };

    const updatedData = (status, note) => {
        let temp = [];
        if (status === 'To Do') {
            temp = [...notesContext.toDo];
            temp.splice(index, 1)
            notesContext.setToDo([...temp, note])
        } else if (status === 'Completed') {
            temp = [...notesContext.completed];
            temp.splice(index, 1)
            notesContext.setCompleted([...temp, note])
        } else if (status === 'On Hold') {
            temp = [...notesContext.onHold];
            temp.splice(index, 1)
            notesContext.setOnHold([...temp, note])
        };
    };

    //  Check if title or note is changed
    const isChanged = (status, data, context) => {
        if (status === 'To Do') {
            // console.log((notesContext.toDo.some(e => e[context] === data)), data, notesContext.toDo)
            return !(notesContext.toDo.some(e => e[context] === data));
        } else if (status === 'Completed') {
            return !(notesContext.completed.some(e => e[context] === data));
        } else if (status === 'On Hold') {
            return !(notesContext.onHold.some(e => e[context] === data));
        };
    };

    // Update title when pressing enter or reset when pressing esc (set to blur will active onBlur function)
    const onTitleKeyPress = (e) => { 
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        } else if (e.keyCode === 27) {
            e.target.blur();
        };
    };

    // Update title when 'un-focus' the titlebox
    const onTitleBlur = (e) => { 
        e.preventDefault();
        if (isChanged(note.status, title, 'title')) {
            axiosConfig.put(`note/${note._id}`, {title})
            .then((response) => {
                updatedData(response.data.updatedNote.status, response.data.updatedNote);
                console.log(response.data.message);
            });
        } else console.log('No title update needed');
    };

    // Update note when pressing enter or reset when pressing esc (set to blur will active onBlur function)
    const onNoteKeyPress = (e) => { 
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        } else if (e.keyCode === 27) {
            e.target.blur();
        };
    };

    // Update note when 'un-focus' the notebox
    const onNoteBlur = (e) => { 
        e.preventDefault();
        if (isChanged(note.status, noteBox, 'note')) {
            axiosConfig.put(`note/${note._id}`, {note: noteBox})
            .then((response) => {
                updatedData(response.data.updatedNote.status, response.data.updatedNote);
                console.log(response.data.message);
            });
        } else console.log('No note update needed');
        
    };

    const stickyNoteColor = () => {
        return note.status === 'To Do'? 'stickynote toDoNote':
                note.status === 'Completed'? 'stickynote completedNote':
                'stickynote onHoldNote';
    }



    return (
        <div className={stickyNoteColor()}>
            <div id='cross-icon'>
                <IconButton onClick={handleDelete} size='small' className='hide'>
                    <CloseIcon color="action" />
                </IconButton>
            </div>
            <div>
                <p id='priorityMark-1' className='priorityMark'>.</p>
                {note.priority === 'Medium' && <p id='priorityMark-2' className='priorityMark'>.</p>}
                {note.priority === 'High' && <p id='priorityMark-2' className='priorityMark'>.</p>}
                {note.priority === 'High' && <p id='priorityMark-3' className='priorityMark'>.</p>}
            </div>
            <div className='note-section'>
                <div>
                    <form name='titleForm' method="POST">
                        <textarea className='sticky-title' name="title" cols="16" rows="2" onChange={e => setTitle(e.target.value)} onBlur={onTitleBlur} onKeyDown={onTitleKeyPress} value={title}></textarea>
                        <input type="submit" hidden />
                    </form>
                </div>
                <div id='sticky-note'>
                    {/* <p>{noteBox}</p> */}
                    <form name='noteForm' method="POST">
                        <textarea className='customized-scrollbar' name="note" cols="18" rows="7" onChange={e => setNoteBox(e.target.value)} onBlur={onNoteBlur} onKeyDown={onNoteKeyPress} value={noteBox}></textarea>
                        <input type="submit" hidden />
                    </form>
                </div>
                <div id='bottom-note'>
                   
                    <div id='sticky-button' className='hide'>
                        {note.status === 'To Do'? 
                        <div>
                            <Button onClick={handlePause} className='button-style' size='small' variant="outlined" startIcon={<PauseIcon/>}>Pause</Button>
                            <Button onClick={handleComplete} className='button-style' size='small' variant="outlined" startIcon={<DoneIcon/>}>Complete</Button></div>
                            : note.status === 'Completed'? 
                            <Button onClick={handleRestore} className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon/>}>Restore</Button>
                            : note.status === 'On Hold'? 
                            <Button onClick={handleRestore} className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon/>}>Restore</Button>
                            : <Button className='button-style' size='small' variant="outlined" startIcon={<EditNoteIcon/>}>Update</Button>}
                    </div>
                    
                </div>
                <div className='date'>
                        <p>
                        {note.status === 'Completed'? 'Completed':
                        note.status === 'On Hold'? 'Paused':
                        note.status === 'To Do' && !updated ? 'Created':
                        'Updated' } on {time}</p>
                    </div>
                
            </div>
        </div>
    )
};

export default StickyNote;