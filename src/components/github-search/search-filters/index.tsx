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

interface ISearchFilterProps {
 handleFilterChange: (val: string) => void;
 defaultVal?: string;
}

const SearchFilter = ({ handleFilterChange, defaultVal }: ISearchFilterProps) => {
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
    <InputLabel id="filter-select-label">Search by Users or Repositories</InputLabel>
    <Select
     labelId="filter-select"
     id="filter-select"
     label="Search by Users or Repositories"
     value={defaultVal}
     onChange={handleChange}>
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
