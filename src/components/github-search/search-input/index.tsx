// Packages
import useDebounce from '@/hooks/use-debounce';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useEffect, useState } from 'react';

const SearchInput = ({ handleSearchChange }: { handleSearchChange: (val: string) => void }) => {
 const [searchText, setSearchText] = useState<string>('');
 /**
  *
  * @Methods
  */
 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setSearchText(event.target.value || ''.trim());
 };

 /**
  * @Vars
  */
 const debouncedSearchVal = useDebounce(searchText, 500);

 /**
  * @Effects
  */

 useEffect(() => {
  if (debouncedSearchVal) handleSearchChange(debouncedSearchVal);
 }, [debouncedSearchVal, handleSearchChange]);

 /**
  * @Render
  */
 return (
  <Box component="form" width={1} noValidate autoComplete="off">
   <TextField
    fullWidth
    id="outlined-name"
    label="please enter some search text"
    onChange={handleChange}
   />
  </Box>
 );
};

export default SearchInput;
