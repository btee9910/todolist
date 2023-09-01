import { Button } from "@mui/material";
import { useNote } from './NoteContext'
import { Translate } from "@mui/icons-material";

const DeleteConfirmation = () => {
    const noteContext = useNote();
  return (
    <div>
        {noteContext.responseData && (
        <div
          style={{
            borderColor: "black",
            border: "medium dashed green",
            backgroundColor: "#8FE398",
            position: "fixed",
            top: "50%",
            left: "50%",
            padding: "10px",
            display:"flex"
          }}
        >
          {noteContext.responseData}
        </div>
      )}
      {noteContext.confirmation && (
      <div className="delete-pop-up">
        <div>Confirm delete?</div>
        <div>
            <Button>Confirm</Button>
            <Button onClick={()=> noteContext.setConfirmation(false) } >Cancel</Button>
        </div>
      </div>
      )}
    </div>
  )
}

export default DeleteConfirmation