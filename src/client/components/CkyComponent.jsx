import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axiosConfig from "../config/axios";
import { useNote } from "./NoteContext";


const CkyComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [priority, setPriority] = useState();
  const [formData, setFormData] = useState({ title: "", note: "" });
  const [inputError, setInputError] = useState(undefined);

  const noteContext = useNote();

  const handleDelete = (e) => {
    e.preventDefault()
    noteContext.setConfirmation(true)
  }

  const handleClick = (e) => {
    e.preventDefault();
    setInputError(null);
    if (priority == e.target.value) {
      setShowForm(!showForm);
      setPriority("");
      setFormData({ title: "", note: "" });
    } else {
      setShowForm(true);
      setPriority(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.title.length >= 5 && formData.note.length >= 5) {
        const response = await axiosConfig.post("note", {
          ...formData,
          priority,
        });
        if (response.status == 200) {
          setFormData({ title: "", note: "" });
          noteContext.setResponseData(response.data.message)
          setTimeout(()=>{
          noteContext.setResponseData(undefined)
          },5000)
        }
      } else {
        alert("Input must be at least 5 characters!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 5) {
      setInputError("Input must be at least 5 characters");
      console.log(value, name);
    } else {
      setInputError(null);
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Button variant="contained" color="error" onClick={handleDelete}>delete button</Button>
        <div style={{ marginBottom: "5px" }}>Select your priority</div>
        {priority === "High" ? (
          <Button variant="contained" onClick={handleClick} value="High">
            High
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleClick} value="High">
            High
          </Button>
        )}
        {priority === "Medium" ? (
          <Button variant="contained" onClick={handleClick} value="Medium">
            Medium
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleClick} value="Medium">
            Medium
          </Button>
        )}
        {priority === "Low" ? (
          <Button variant="contained" onClick={handleClick} value="Low">
            Low
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleClick} value="Low">
            Low
          </Button>
        )}
      </div>

      {showForm && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                style={{
                  width: "350px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  fontFamily: "sans-serif",
                }}
                type="text"
                name="title"
                placeholder="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={28}
              />
              {inputError && <div style={{ color: "red" }}>{inputError}</div>}
            </div>
            <div>
              <textarea
                style={{
                  fontFamily: "sans-serif",
                  width: "350px",
                  marginBottom: "10px",
                }}
                rows={4}
                type="text"
                name="note"
                placeholder="note"
                value={formData.note}
                overflow="hidden"
                onChange={handleChange}
                maxLength={160}
              />
            </div>
            <Button
              style={{ marginBottom: "10px" }}
              type="submit"
              size="small"
              variant="outlined"
            >
              Create To Do
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default CkyComponent;
