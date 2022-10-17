// Services
import { githubConstantsService } from '@/services/github-search';

// Packages
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/***
 * @Variables
 */
const searchModes = githubConstantsService.SEARCH_MODES;

const SearchFilter = ({ handleFilterChange }: { handleFilterChange: (val: string) => void }) => {
 /**
  *
  * @Methods
  */

 const handleChange = (event: SelectChangeEvent) => {
  handleFilterChange(event.target.value as string);
 };

 /**
  * @Render
  */
 return (
  <Box sx={{ minWidth: 120 }}>
   <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Search by</InputLabel>
    {/* @ts-ignore */}
    <Select
     labelId="demo-simple-select-label"
     id="demo-simple-select"
     label="search by"
     onChange={handleChange}>
     <MenuItem value="">
      <em>search by</em>
     </MenuItem>
     {Object.values(searchModes).map((mode) => {
      return (
       <MenuItem key={mode.key} value={mode.key}>
        {mode?.displayText}
       </MenuItem>
      );
     })}
    </Select>
   </FormControl>
  </Box>
 );
};

export default SearchFilter;
