import SectionBlock from "./components/SectionBlock";
import CkyComponent from "./components/CkyComponent";
import SortingDropdown from "./components/SortingDropdown";
import { useNote } from "./components/NoteContext";
import { Button } from "@mui/material";
const App = () => {
  const noteContext = useNote();

  return (
    <div className="container">
      <header>
        <h1>Get your work</h1>
      </header>
      <CkyComponent></CkyComponent>
      <div className='dropdown'>
          <SortingDropdown />
      </div>
      <SectionBlock title='To Do' status='toDo'/>
      <SectionBlock title='Completed' status='completed'/>
      <SectionBlock title='On Hold' status='onHold'/>
      {noteContext.responseData && (
        <div
          style={{
            borderColor: "black",
            border: "medium dashed green",
            backgroundColor: "#8FE398",
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: "1",
            padding: "10px",
            display:"flex"
          }}
        >
          {noteContext.responseData}
        </div>
      )}
      {noteContext.confirmation && (
      <div
      style={{
        borderColor: "black",
        border: "medium dashed red",
        backgroundColor: "#E8A4A4",
        position: "fixed",
        top: "50%",
        left: "50%",
        zIndex: "1",
        padding: "10px",
      }}
      >
        <div>Confirm delete?</div>
        <div>
        <Button>Confirm</Button>
        <Button onClick={()=> noteContext.setConfirmation(false) } >Cancel</Button>
        </div>

      
      </div>
      )}
    </div>
  );
};

export default App;
