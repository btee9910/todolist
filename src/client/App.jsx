import SectionBlock from "./components/SectionBlock";
import CkyComponent from "./components/CkyComponent";
import { useNote } from "./components/NoteContext";
import { Button } from "@mui/material";
const App = () => {
  const noteContext = useNote();

  return (
    <div className="container">
      <header>
        <h1>Get your work</h1>
      </header>
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
      <CkyComponent />
      <SectionBlock title="To Do" />
      <SectionBlock title="Completed" />
      <SectionBlock title="On Hold" />
    </div>
  );
};

export default App;
