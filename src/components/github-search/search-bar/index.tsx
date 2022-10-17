// Services
import { githubConstantsService } from '@/services/github-search/index';

// Types
import { IPageQuery } from '@/services/github-search/types';

// Packages
import { Box, Grid } from '@mui/material';
import { useCallback } from 'react';

// Components
import SearchFilter from '../search-filters';
import SearchInput from '../search-input';

const SearchBar = ({
 onSearchChange,
}: {
 onSearchChange: (query: Partial<IPageQuery>) => void;
}) => {
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

 const defaultFilter = githubConstantsService.SEARCH_MODES?.users?.key;

 /**
  * @Render
  */
 return (
  <Box mb={2.5}>
   <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
     <SearchFilter handleFilterChange={handleFilterChange} defaultVal={defaultFilter} />
    </Grid>
    <Grid item xs={12} md={8}>
     <SearchInput handleSearchChange={handleSearchChange} />
    </Grid>
   </Grid>
  </Box>
 );
};

export default SearchBar;
