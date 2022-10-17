// Packages
import { useCallback } from 'react';

// Components
import SearchFilter from '../search-filters';
import SearchInput from '../search-input';

const SearchBar = ({ onSearchChange }: { onSearchChange: (query: any) => void }) => {
 /**
  * @Methods
  */
 const handleSearchChange = useCallback((val: string) => {
  onSearchChange({ searchText: val });
 }, []);

 const handleFilterChange = useCallback((val: string) => {
  onSearchChange({ filter: val });
 }, []);

 /**
  * @Render
  */
 return (
  <>
   <SearchFilter handleFilterChange={handleFilterChange} />
   <SearchInput handleSearchChange={handleSearchChange} />
  </>
 );
};

export default SearchBar;
