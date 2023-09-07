import { Margin } from "@mui/icons-material";
import { useEffect, useState } from "react"

const CurrentTime = () => {

  const [time, setTime] = useState('');

  useEffect(() => {
    setInterval(() => setTime({
      date: (new Intl.DateTimeFormat('en-US', {
        dateStyle: "medium",
      }).format(new Date())),
      time: new Intl.DateTimeFormat('en-US', {
        timeStyle: "medium",
      }).format(new Date())
    }), 1000)

  }, [])


  return (
    <>
      <div className='current'>{time.date}</div>
      <div className='current'>{time.time}</div>
    </>
  )
}

export default CurrentTime