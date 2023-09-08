import { Button } from "@mui/material";
import { useNote } from './NoteContext'

const DeleteConfirmation = () => {
  const noteContext = useNote();
  return (
    <div>
      {noteContext.confirmation && (
        <div className="delete-pop-up">
          <div>Confirm delete?</div>
          <div>
            <Button>Confirm</Button>
            <Button onClick={() => noteContext.setConfirmation(false)} >Cancel</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteConfirmation