// Components
import RepositoryList from '@/components/github-search/repository-list';
import SearchBar from '@/components/github-search/search-bar';
import UserList from '@/components/github-search/user-list';
import { githubApiService, githubConstantsService } from '@/services/github-search';
import { Container } from '@mui/system';

// Types
import { PageQuery } from '@/services/github-search/types';

// Services
import { ReactQueryEnums } from '@/services/react-query';

// Styles

// Packages
import CircularProgressBar from '@/components/ui/circular-progress-bar';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Home: NextPage = () => {
 /**
  * @refs
  */
 const bottomObserverElem = useRef(null);

 /**
  * @Hooks
  */

 // state for maintaing page query params
 const [searchQuery, setSearchQuery] = useState<PageQuery>({
  limit: githubConstantsService.DEFAULT_QUERY_LIMIT,
  searchText: '',
  filter: '',
  totalPages: 0,
  totalElements: 0,
  nextPage: 2,
  currentPage: 1,
 });

 // state for maintaining search results
 const [searchData, setSearchData] = useState<any>([]);

 // Hooks resposible to fetch search results
 const { isSuccess, isFetching, refetch } = useQuery(
  [ReactQueryEnums.GET_GITHUB_LIST],
  () => githubApiService.getGithubListData(searchQuery),
  {
   onSuccess: (resp: any) => {
    const totalPages = Math.ceil(resp?.total_count / searchQuery.limit);
    setSearchQuery((prevState: PageQuery) => ({
     ...prevState,
     totalPages,
     totalElements: resp?.total_count,
     nextPage: prevState?.currentPage + 1,
    }));
    setSearchData((prevData: any) => [...prevData, ...resp?.items]);
   },
   enabled: !!(searchQuery?.searchText && searchQuery?.filter),
   keepPreviousData: true,
  },
 );

 /**
  * @Variables
  */

 // If search results has more page available this will evaluate to true.
 const hasNextPage = useMemo(() => {
  return searchQuery?.totalPages && searchQuery?.currentPage !== searchQuery?.totalPages;
 }, [searchQuery?.totalPages, searchQuery?.currentPage]);

 const listLoader = !!(isFetching && !searchData.length);
 const bottomLoader = !!(isFetching && searchData.length);
 const noResults = !!(!isFetching && !searchData.length && isSuccess);

 /**
  * @Methods
  */

 /**
  * @pageQuery contains partial payload of page query to override.
  */
 const onPageChange = useCallback((pageQuery: PageQuery) => {
  // Empty the previous results when search text or search filter is changed.
  setSearchData([]);

  // reset query to initial value and set search text and search filter
  setSearchQuery((prevState: PageQuery) => ({
   ...prevState,
   ...pageQuery,
   totalPages: 0,
   totalElements: 0,
   currentPage: 1,
   nextPage: 2,
  }));
 }, []);

 const handleBottomObserver = useCallback(
  (entries: any) => {
   const [target] = entries;
   if (target.isIntersecting && hasNextPage) {
    setSearchQuery((prevState: PageQuery) => ({
     ...prevState,
     currentPage: prevState?.nextPage,
    }));
   }
  },
  [hasNextPage],
 );

 /**
  * @Effects
  */

 useEffect(() => {
  const element = bottomObserverElem.current;
  const option = { threshold: 0 };
  const observer = new IntersectionObserver(handleBottomObserver, option);
  observer.observe(element!);
  return () => observer.unobserve(element!);
 }, [handleBottomObserver]);

 useEffect(() => {
  /**
   * NOTE: we will only make the API call when search text, searchFilter are present.
   */
  if (searchQuery.searchText && searchQuery.filter) {
   refetch();
  }
 }, [searchQuery.searchText, searchQuery.currentPage, searchQuery.filter, refetch]);

 /**
  * @Render
  */
 return (
  <Box bgcolor="#f6f8fa" width={1} height="calc(100vh - 65px)">
   <Container maxWidth="xl">
    <Box width={1}>
     <SearchBar onSearchChange={onPageChange} />

     <Box
      display="flex"
      alignItems={listLoader ? 'center' : 'flex-start'}
      justifyContent={listLoader ? 'center' : 'flex-start'}
      flexDirection="column"
      position="relative"
      width={1}
      height={700}
      sx={{ overflowY: 'scroll' }}>
      {listLoader && <CircularProgressBar color="inherit" />}
      {noResults && (
       <Box
        component="p"
        fontSize="24px"
        fontWeight="600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={1}
        height={1}>
        No results found...
       </Box>
      )}
      {!listLoader && searchQuery.filter === githubConstantsService.SEARCH_MODES?.users?.key && (
       <UserList users={searchData} />
      )}
      {!listLoader &&
       searchQuery.filter === githubConstantsService.SEARCH_MODES?.repositories?.key && (
        <RepositoryList repositories={searchData} />
       )}
      <Box
       className="loader"
       ref={bottomObserverElem}
       width={1}
       height="1px"
       display="flex"
       alignItems="center"
       justifyContent="center">
       {bottomLoader && <CircularProgressBar color="inherit" />}
      </Box>
     </Box>
    </Box>
   </Container>
  </Box>
 );
};

export default Home;
