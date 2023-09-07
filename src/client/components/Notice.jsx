import { useNote } from "./NoteContext"

const Notice = () => {
  const noteContext = useNote();

  return (
    <>
      {noteContext.notice && <div id="notice" className={noteContext.notice.type}>
        <h4>{noteContext.notice.message}</h4>
      </div>}
    </>
  )
}

export default Notice