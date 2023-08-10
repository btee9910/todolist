import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNote } from './NoteContext';



const SortingDropdown = props => {
  const notesContext = useNote();

  const handleChange = (e) => {
    notesContext.setSort(e.target.value);
  };

  return (
    <FormControl sx={{m: 1, minWidth: 135 }}  size="small">
    <InputLabel id="demo-select-small-label">Sort</InputLabel>
    <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={notesContext.sort}
        label="Sort"
        onChange={handleChange}>

        <MenuItem value={'Date, old to new'}>Date, old to new</MenuItem>
        <MenuItem value={'Date, new to old'}>Date, new to old</MenuItem>
        <MenuItem value={'Priority, low to high'}>Priority, low to high</MenuItem>
        <MenuItem value={'Priority, high to low'}>Priority, high to low</MenuItem>

    </Select>
    </FormControl>
  )
}

SortingDropdown.propTypes = {}

export default SortingDropdown