import { useEffect, useState, createContext, useContext } from "react";
import axiosConfig from "../config/axios";

export const NoteContext = createContext(null);

export function useNote() {
  const useNoteContext = useContext(NoteContext);
  if (!useNoteContext) {
    throw new Error("Not in provider");
  }
  return useNoteContext;
}

export default function NoteProvider(props) {
  const [toDo, setToDo] = useState([]);
  const [onHold, setOnHold] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [sort, setSort] = useState('Date, old to new');
  const [responseData, setResponseData] = useState(undefined)
  const [confirmation, setConfirmation] = useState(false)


  //fetch main data from server
  const fetchData = () => {
    try {
      axiosConfig.get("note")
      .then((response) => {
        if (response.status === 200) {
          let todo = [];
          let onHold = [];
          let completed = [];

          response.data.forEach((data) => {
            if (data.status === "To Do") {
              todo.push(data);
            } else if (data.status === "On Hold") {
              onHold.push(data);
            } else {
              completed.push(data);
            }
          });
          setToDo(todo);
          setOnHold(onHold);
          setCompleted(completed);
        };
      });
    } catch (e) {
      console.log(e);
    }
  };  

  useEffect( fetchData, []);

  // Sort data by latest date from old to new
  const compareDate = (a, b) => {
    const date1 = a.updatedAt;
    const date2 = b.updatedAt;

    let comparison = 0;
    date1 > date2? comparison = 1: comparison = -1;
    return comparison;
  };

  // Sort data by priority
  const sortPriority = (order, notes) => {
    let low = [];
    let medium = [];
    let high = [];
    notes.forEach((note) => {
      note.priority === 'Low'? low.push(note):
      note.priority === 'Medium'? medium.push(note):
      high.push(note);
    });
    return order === 'incline'? [...low, ...medium, ...high]:
     [...high, ...medium, ...low];
  };

  // Sorting function
  const sorting = (type, notes) => {
    let tempNotes = notes.sort(compareDate);
    if (type === 'Date, old to new') {
      return [...tempNotes];
    } else if (type === 'Date, new to old') {
      return [...tempNotes.reverse()];
    } else if (type === 'Priority, low to high') {
      return sortPriority('incline', tempNotes);
    } else if (type === 'Priority, high to low') {
      return sortPriority('decline', tempNotes);
    }
  }

  useEffect(() => {
    setToDo(sorting(sort, toDo));
    setOnHold(sorting(sort, onHold));
    setCompleted(sorting(sort, completed));
  }, [sort]);

  const values = {
    toDo,
    setToDo,
    onHold,
    setOnHold,
    completed,
    setCompleted,
    sort,
    setSort,
    responseData,
    setResponseData,
    confirmation,
    setConfirmation
  };

  return (
    <NoteContext.Provider value={values}>{props.children}</NoteContext.Provider>
  );
}
