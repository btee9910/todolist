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
  const [toDo, setToDo] = useState({});
  const [onHold, setOnHold] = useState({});
  const [completed, setCompleted] = useState({});
  const [responseData, setResponseData] = useState(undefined)
  const [confirmation, setConfirmation] = useState(false)


  //fetch main data from server
  const getMain = async () => {
    try {
      const response = await axiosConfig.get("note");
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  //trigger function to fetch data and set to 3 differemt status
  const fetchData = async () => {
    const storeMain = await getMain();
    const todo = [];
    const onHold = [];
    const completed = [];
    storeMain.forEach((data) => {
      if (data.status === "To Do") {
        todo.push(data);
      } else if (data.status === "On Hold") {
        onHold.push(data);
      } else {
        completed.push(data);
      }
    });
    setToDo({ todo });
    setOnHold({ onHold });
    setCompleted({ completed });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const values = {
    toDo,
    onHold,
    completed,
    responseData,
    setResponseData,
    confirmation,
    setConfirmation
  };

  return (
    <NoteContext.Provider value={values}>{props.children}</NoteContext.Provider>
  );
}
