// Packages
import { Box, Grid } from '@mui/material';
import { useCallback } from 'react';

// Components
import SearchFilter from '../search-filters';
import SearchInput from '../search-input';

const SearchBar = ({ onSearchChange }: { onSearchChange: (query: any) => void }) => {
 /**
  * @Methods
  */
 const handleSearchChange = useCallback(
  (val: string) => {
   onSearchChange({ searchText: val });
  },
  [onSearchChange],
 );

 const handleFilterChange = useCallback(
  (val: string) => {
   onSearchChange({ filter: val });
  },
  [onSearchChange],
 );

 /**
  * @Render
  */
 return (
  <Box mb={2.5}>
   <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
     <SearchFilter handleFilterChange={handleFilterChange} />
    </Grid>
    <Grid item xs={12} md={8}>
     <SearchInput handleSearchChange={handleSearchChange} />
    </Grid>
   </Grid>
  </Box>
 );
};

export default SearchBar;
