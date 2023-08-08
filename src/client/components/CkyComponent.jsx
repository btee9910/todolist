import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";

const CkyComponent = () => {
    
  const [showForm, setShowForm] = useState(false);
  const [priority, setPriority] = useState();

  const handleChange = (event, newPriority) => {
    setPriority(newPriority)
    if (newPriority === null){
        setShowForm(false)
    }else{setShowForm(true)}
  };


  const children = [
    <ToggleButton value="high" key="high">
      High
    </ToggleButton>,
    <ToggleButton value="medium" key="medium">
      Medium
    </ToggleButton>,
    <ToggleButton value="low" key="low">
      Low
    </ToggleButton>,
  ];

  const control = {
    value: priority,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <>
      <Stack sx={{ mb: 2 }} spacing={2} alignItems="center">
        <ToggleButtonGroup {...control} aria-label="Medium sizes">
          {children}
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ mb: 2 }}>
        {showForm && (
          <TextField
            id="outlined-basic"
            label={priority}
            variant="outlined"
            size="small"
          />
        )}
      </Box>
    </>
  );
};

export default CkyComponent;
