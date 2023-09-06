import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNote } from "./NoteContext";
import SortingDropdown from "./SortingDropdown";
import CurrentTime from "./CurrentTime";

const HeaderBar = () => {
  const [inputError, setInputError] = useState(undefined);

  const noteContext = useNote();
  const priorityList = ['High', 'Medium', 'Low'];
  const todayDate = new Date().toString();


  const handleClick = (e) => {
    e.preventDefault();
    setInputError(null);
    if (noteContext.newNote.priority === e.target.value) {
      noteContext.setShowForm(!(noteContext.showForm));
      noteContext.setNewNote({...noteContext.newNote, priority: ''});
      noteContext.setTempTitle('');
      noteContext.setTempNote('');
    } else {
      noteContext.setShowForm(true);
      noteContext.setNewNote({...noteContext.newNote, priority: e.target.value, title: noteContext.tempTitle, note: noteContext.tempNote});
    }
  };

  return (
    <header>
        <div className="header-div">
          <h1>GET MY</h1>
          <h1>WORK DONE</h1>
        </div>
        <div className="header-div">
            <p className="header-p1">Create To Do⤵</p>
            {/* button */}
            {priorityList.map((eachPriority, i) => {
                return (
                        <Button variant={noteContext.newNote.priority === eachPriority? "contained": "outlined"} onClick={handleClick} value={eachPriority} key={i}>
                            {eachPriority}
                        </Button>
                );
            })}
            <p className="header-p2">Priority</p>

        </div>
        <div className='dropdown header-div'>
          <div>
            <CurrentTime/>
          </div>
          <div>
            <SortingDropdown />
          </div>
        </div>
    </header>
  );
};

export default HeaderBar;