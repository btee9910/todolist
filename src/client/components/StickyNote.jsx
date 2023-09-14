import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/Restore';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNote } from './NoteContext';
import axiosConfig from '../config/axios';

const StickyNote = ({ note, index, newNote }) => {
    const noteContext = useNote();
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [noteBox, setNoteBox] = useState(note.note);
    const [time, setTime] = useState('');
    const [confirmPopUp, setConfirmPopUp] = useState(false)

    // Converting MongoDB time format
    const convertTime = () => {
        const date = new Date(note.updatedAt);
        setTime(new Intl.DateTimeFormat('en-AU', {
            dateStyle: "short",
            timeStyle: "short",
        }).format(date));
        if (note.updatedAt !== note.createdAt) setUpdated(true);
    };

    // Initial Data Rendering
    useEffect(() => {
        setTitle(note.title);
        setNoteBox(note.note);
        newNote ? setTime('') : convertTime();
    }, [note]);

    // handle pause button
    const handlePause = (e) => {
        e.preventDefault();
        axiosConfig.put(`note/${note._id}`, { status: 'On Hold' })
            .then((response) => {
                if (response.status === 200) {
                    showNotice(`Paused: Task- ${response.data.updatedNote.title}`);
                    let tempNote = [...noteContext.toDo];
                    tempNote.splice(index, 1);
                    noteContext.setToDo(tempNote);
                    noteContext.setOnHold(noteContext.sorting(noteContext.sort, [...noteContext.onHold, response.data.updatedNote]));
                };
            });
    };

    // handle complete button
    const handleComplete = (e) => {
        e.preventDefault();
        axiosConfig.put(`note/${note._id}`, { status: 'Completed' })
            .then((response) => {
                if (response.status === 200) {
                    showNotice(`Completed: Task- ${response.data.updatedNote.title}`);
                    let tempNote = [...noteContext.toDo];
                    tempNote.splice(index, 1);
                    noteContext.setToDo(tempNote);
                    noteContext.setCompleted(noteContext.sorting(noteContext.sort, [...noteContext.completed, response.data.updatedNote]));
                };
            });
    };

    // handle restore button
    const handleRestore = (e) => {
        e.preventDefault();
        let currentStatus = note.status;
        axiosConfig.put(`note/${note._id}`, { status: 'To Do' })
            .then((response) => {
                if (response.status === 200) {
                    showNotice(`Restored: Task- ${response.data.updatedNote.title}`);
                    let tempNote = [];
                    if (currentStatus === 'On Hold') {
                        tempNote = [...noteContext.onHold];
                        tempNote.splice(index, 1);
                        noteContext.setOnHold([...tempNote]);
                    } else {
                        tempNote = [...noteContext.completed];
                        tempNote.splice(index, 1);
                        noteContext.setCompleted([...tempNote]);
                    }

                    noteContext.setToDo(noteContext.sorting(noteContext.sort, [...noteContext.toDo, response.data.updatedNote]));
                };
            });
    };

    // handle delete button by showing confirmation popup
    const handleDelete = (e) => {
        setConfirmPopUp(true);
    };

    // handle delete confirmation button
    const handleConfirm = (e) => {
        if (newNote) {
            resetNewNote();
            showNotice('Cancelled: New To Do');
        } else {
            let currentStatus = note.status;
            axiosConfig.delete(`note/${note._id}`)
                .then((response) => {
                    console.log(response.data.message);
                    showNotice(response.data.message);
                    let tempNote = [];
                    if (currentStatus === 'To Do') {
                        tempNote = noteContext.toDo;
                        tempNote.splice(index, 1);
                        noteContext.setToDo([...tempNote]);
                    } else if (currentStatus === 'On Hold') {
                        tempNote = noteContext.onHold;
                        tempNote.splice(index, 1);
                        noteContext.setOnHold([...tempNote]);
                    } else {
                        tempNote = noteContext.completed;
                        tempNote.splice(index, 1);
                        noteContext.setCompleted([...tempNote]);
                    };
                })
        };
        setConfirmPopUp(false);
    };

    // handle popup cencel button
    const handleCancel = (e) => {
        setConfirmPopUp(false);
    };

    // handle newNote create button
    const handleCreate = (e) => {
        postNewNote();
    };

    // clear data on newNote
    const resetNewNote = () => {
        noteContext.setNewNote({ ...noteContext.newNote, priority: '', title: '', note: '' });
        noteContext.setShowForm(false);
        noteContext.setTempTitle('');
        noteContext.setTempNote('');
    };

    // posting newNote data to backend
    const postNewNote = () => {
        if (title.length >= 1 && noteBox.length >= 1) {
            axiosConfig.post(`note`, { ...note, title: title, note: noteBox })
                .then((response) => {
                    if (response.status === 200) {
                        noteContext.setToDo(noteContext.sorting(noteContext.sort, [...noteContext.toDo, response.data.note]));
                        showNotice(response.data.message);
                        resetNewNote();
                    };
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            showNotice('Title and note cannot be empty.', 'warning');
        };
    };

    // updating data for rendering
    const updatedData = (status, note) => {
        let temp = [];
        if (status === 'To Do') {
            temp = [...noteContext.toDo];
            !newNote && temp.splice(index, 1)
            noteContext.setToDo(noteContext.sorting(noteContext.sort, [...temp, note]))
        } else if (status === 'Completed') {
            temp = [...noteContext.completed];
            temp.splice(index, 1)
            noteContext.setCompleted(noteContext.sorting(noteContext.sort, [...temp, note]))
        } else if (status === 'On Hold') {
            temp = [...noteContext.onHold];
            temp.splice(index, 1)
            noteContext.setOnHold(noteContext.sorting(noteContext.sort, [...temp, note]))
        };
    };

    //  Check if title or note is changed
    const isChanged = (status, data, context) => {
        if (status === 'To Do') {
            return !(noteContext.toDo.some(e => e[context] === data));
        } else if (status === 'Completed') {
            return !(noteContext.completed.some(e => e[context] === data));
        } else if (status === 'On Hold') {
            return !(noteContext.onHold.some(e => e[context] === data));
        };
    };

    // Update title when pressing enter or reset when pressing esc (set to blur will active onBlur function)
    const onTitleKeyPress = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            newNote ? postNewNote()
                : e.target.value.length === 0 ? showNotice('Title cannot be empty.', 'warning')
                    : noteBox.length === 0 ? showNotice('Note cannot be empty.', 'warning')
                        : e.target.blur();
        } else if (e.keyCode === 27 && !newNote) {
            e.target.value = note.title;
            setTitle(note.title);
            e.target.blur();
        };
    };

    // Update title when 'un-focus' the titlebox
    const onTitleBlur = (e) => {
        e.preventDefault();
        if (e.target.value.length === 0 && !newNote) {
            showNotice('Title cannot be empty.', 'warning');
            document.getElementById('title-text' + note._id).focus();
        } else if (noteBox.length === 0 && !newNote) {
            showNotice('Note cannot be empty.', 'warning')
            document.getElementById('note-text' + note._id).focus();
        } else if (!newNote && isChanged(note.status, e.target.value, 'title')) {
            axiosConfig.put(`note/${note._id}`, { title: e.target.value })
                .then((response) => {
                    updatedData(response.data.updatedNote.status, response.data.updatedNote);
                    // console.log(response.data.message);
                    showNotice(response.data.message);
                }).catch((error) => {
                    console.log(error);
                });
        } else console.log('No title update needed');
    };

    // Update note when pressing enter or reset when pressing esc (set to blur will active onBlur function)
    const onNoteKeyPress = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            newNote ? postNewNote()
                : e.target.value.length === 0 ? showNotice('Note cannot be empty.', 'warning')
                    : title.length === 0 ? showNotice('Title cannot be empty.', 'warning')
                        : e.target.blur();
        } else if (e.keyCode === 27 && !newNote) {
            e.target.value = note.note;
            setNoteBox(note.note);
            e.target.blur();
        };
    };

    // Update note when 'un-focus' the notebox
    const onNoteBlur = (e) => {
        e.preventDefault();
        if (e.target.value.length === 0 && !newNote) {
            showNotice('Note cannot be empty.', 'warning');
            document.getElementById('note-text' + note._id).focus();
        } else if (title.length === 0 && !newNote) {
            showNotice('Title cannot be empty.', 'warning')
            document.getElementById('title-text' + note._id).focus();
        } else if (!newNote && isChanged(note.status, e.target.value, 'note')) {
            axiosConfig.put(`note/${note._id}`, { note: e.target.value })
                .then((response) => {
                    updatedData(response.data.updatedNote.status, response.data.updatedNote);
                    // console.log(response.data.message);
                    showNotice(response.data.message);
                });
        } else console.log('No note update needed');
    };

    // Edit CCS for stickyNote based on its status
    const stickyNoteColor = () => {
        return newNote ? 'stickynote newNote' :
            note.status === 'To Do' ? 'stickynote toDoNote' :
                note.status === 'Completed' ? 'stickynote completedNote' :
                    'stickynote onHoldNote';
    };

    // showing notification
    const showNotice = (message, type = 'notice') => {
        setTimeout(0)
        noteContext.setNotice({ message, type });
        setTimeout((t) => {
            noteContext.setNotice({ message: '', type: '' });
        }, 3000);
    }

    return (
        <div className={stickyNoteColor()}>

            {/* Delete Button */}
            <div id='cross-icon'>
                <IconButton onClick={handleDelete} size='small' className='hide'>
                    <CloseIcon color="action" />
                </IconButton>
            </div>

            {/* Priority indication */}
            <div>
                <p id='priorityMark-1' className='priorityMark'>.</p>
                {note.priority === 'Medium' && <p id='priorityMark-2' className='priorityMark'>.</p>}
                {note.priority === 'High' && <p id='priorityMark-2' className='priorityMark'>.</p>}
                {note.priority === 'High' && <p id='priorityMark-3' className='priorityMark'>.</p>}
            </div>
            <div>
                <h1 className='update-sign'>Updated!</h1>
            </div>
            {/* Delete confirmation */}
            {confirmPopUp && (
                <div onClick={handleCancel} className='pop-up-background'>
                    <div className="delete-pop-up">
                        {newNote ? <div>Removing new To Do?</div> : <div>Deleting: Task- {note.title}?</div>}
                        <div>
                            <Button onClick={handleConfirm}>Confirm</Button>
                            <Button onClick={handleCancel} >Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className='note-section'>
                {/* Title */}
                <div id='title-div'>
                    <form name='titleForm'>
                        <textarea required id={'title-text' + note._id} className='sticky-title' placeholder='Title' maxLength={28} name="title" cols="16" rows="2" onChange={e => { setTitle(e.target.value); (newNote && noteContext.setTempTitle(e.target.value)) }} onBlur={onTitleBlur} onKeyDown={onTitleKeyPress} value={title} />
                        <input type="submit" hidden />
                        <div className='hide-title-count'>
                            <p id='title-count' className='count'>{title.length} / 28</p>
                        </div>
                    </form>
                </div>
                {/* Note detail */}
                <div id='sticky-note'>
                    <form name='noteForm'>
                        <textarea required id={'note-text' + note._id} className='customized-scrollbar' placeholder='note' maxLength={160} name="note" cols="18" rows="7" onChange={e => { setNoteBox(e.target.value); (newNote && noteContext.setTempNote(e.target.value)) }} onBlur={onNoteBlur} onKeyDown={onNoteKeyPress} value={noteBox} />
                        <input type="submit" hidden />
                        <div className='hide-note-count'>
                            <p id='note-count' className='count'>{noteBox.length} / 160</p>
                        </div>
                    </form>
                </div>

                {/* Bottom Buttom */}
                <div id='bottom-note'>
                    <div id='sticky-button' className='hide'>
                        {newNote ? <Button onClick={handleCreate} className='button-style' size='small' variant="outlined" startIcon={<AddIcon />}>Create</Button>
                            : note.status === 'To Do' ?
                                <div>
                                    <Button onClick={handlePause} className='button-style' size='small' variant="outlined" startIcon={<PauseIcon />}>Pause</Button>
                                    <Button onClick={handleComplete} className='button-style' size='small' variant="outlined" startIcon={<DoneIcon />}>Complete</Button>
                                </div>
                                : note.status === 'Completed' ?
                                    <Button onClick={handleRestore} className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon />}>Restore</Button>
                                    : note.status === 'On Hold' ?
                                        <Button onClick={handleRestore} className='button-style' size='small' variant="outlined" startIcon={<RestoreIcon />}>Restore</Button>
                                        : <Button className='button-style' size='small' variant="outlined" startIcon={<EditNoteIcon />}>Update</Button>}
                    </div>
                </div>

                {/* Date */}
                <div className='date'>
                    <p>
                        {newNote ? 'Creating new note. . .' :
                            note.status === 'Completed' ? 'Completed on' :
                                note.status === 'On Hold' ? 'Paused on' :
                                    note.status === 'To Do' && !updated ? 'Created on' :
                                        'Updated on'} {time}</p>
                </div>

            </div>
        </div>
    )
};

export default StickyNote;
