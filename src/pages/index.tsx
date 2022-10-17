// Components
import RepositoryList from '@/components/github-search/repository-list';
import SearchBar from '@/components/github-search/search-bar';
import UserList from '@/components/github-search/user-list';
import CircularProgressBar from '@/components/ui/circular-progress-bar';

// Types
import { IPageQuery, ISearchResponse, ISearchResults } from '@/services/github-search/types';

// Services
import { githubApiService, githubConstantsService } from '@/services/github-search';
import { ReactQueryEnums } from '@/services/react-query';

// Packages
import EmptyListSkeleton from '@/components/ui/empty-list-skeleton';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
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
 const [searchQuery, setSearchQuery] = useState<IPageQuery>({
  limit: githubConstantsService.DEFAULT_QUERY_LIMIT,
  searchText: '',
  filter: githubConstantsService.SEARCH_MODES?.users?.key,
  totalPages: 0,
  totalElements: 0,
  nextPage: 2,
  currentPage: 1,
 });

 // state for maintaining search results
 const [searchData, setSearchData] = useState<Partial<ISearchResults[]>>([]) as Array<any>;

 // Hooks resposible to fetch search results
 const { isSuccess, isFetching, refetch } = useQuery(
  [ReactQueryEnums.GET_GITHUB_LIST],
  () => githubApiService.getGithubListData(searchQuery),
  {
   onSuccess: (resp: ISearchResponse) => {
    const totalPages = Math.ceil(resp?.total_count / searchQuery.limit);
    setSearchQuery((prevState: IPageQuery) => ({
     ...prevState,
     totalPages,
     totalElements: resp?.total_count,
     nextPage: prevState?.currentPage + 1,
    }));
    setSearchData((prevData: Partial<ISearchResults[]>) => [...prevData, ...resp.items]);
   },
   enabled: !!(searchQuery.searchText || '').trim(),
   keepPreviousData: true,
  },
 );

 /**
  * @Variables
  */

 const listLoader = !!(isFetching && !searchData.length);
 const bottomLoader = !!(isFetching && searchData.length);
 const noResults = !!(!isFetching && !searchData.length && isSuccess);

 const hasNextPage = useMemo(() => {
  // If search results has more page available this will evaluate to true.
  return searchQuery?.totalPages && searchQuery?.currentPage !== searchQuery?.totalPages;
 }, [searchQuery?.totalPages, searchQuery?.currentPage]);

 const showUserList = useMemo(() => {
  return !!(!listLoader && searchQuery.filter === githubConstantsService.SEARCH_MODES?.users?.key);
 }, [listLoader, searchQuery.filter]);

 const showRepoList = useMemo(() => {
  return !!(
   !listLoader && searchQuery.filter === githubConstantsService.SEARCH_MODES?.repositories?.key
  );
 }, [listLoader, searchQuery.filter]);

 /**
  * @Methods
  */

 /**
  * @pageQuery contains partial payload of page query to override.
  */
 const onPageChange = useCallback((pageQuery: Partial<IPageQuery>) => {
  // Empty the previous results when search text or search filter is changed.
  setSearchData([]);

  // reset query to initial value and set search text and search filter
  setSearchQuery((prevState: IPageQuery) => ({
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
   /**
    * NOTE: we will only fetch more results for API,
    * when more pages are available.
    */
   if (target.isIntersecting && hasNextPage) {
    // set current page to next page which will trigger effect responsible for making API call.
    setSearchQuery((prevState: IPageQuery) => ({
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
  const option = { threshold: 1.0 };
  const observer = new IntersectionObserver(handleBottomObserver, option);
  observer.observe(element!);
  return () => observer.unobserve(element!);
 }, [handleBottomObserver]);

 useEffect(() => {
  /**
   * NOTE: we will only make the API call when search text is present.
   */
  if (searchQuery.searchText || ''.trim()) {
   refetch();
  }
 }, [searchQuery.searchText, searchQuery.currentPage, searchQuery.filter, refetch]);

 /**
  * @Render
  */
 return (
  <Box bgcolor="#f6f8fa" width={1} height="calc(100vh - 65px)">
   <Container maxWidth={false}>
    <Box width={1}>
     {/* Search Bar component */}
     <SearchBar onSearchChange={onPageChange} />
     <Box
      display="flex"
      alignItems={listLoader ? 'center' : 'flex-start'}
      justifyContent={listLoader ? 'center' : 'flex-start'}
      flexDirection="column"
      position="relative"
      width={1}
      height={1}>
      {/* Loader when initial results are loading */}
      {listLoader && <EmptyListSkeleton />}
      {/* When no results are present, we show this message */}
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
      {/* when user has selected user type from filter show user list */}
      {showUserList && <UserList users={searchData} />}
      {/* when user has selected repository type from filter show repository list */}
      {showRepoList && <RepositoryList repositories={searchData} />}
      <Box
       className="loader"
       position="absolute"
       bottom={50}
       ref={bottomObserverElem}
       width={1}
       height="1px"
       display="flex"
       alignItems="center"
       justifyContent="center">
       {/* when user is scrolling the list this loader will show at bottom to indicate data is being fetched from API */}
       {bottomLoader && <CircularProgressBar color="inherit" />}
      </Box>
     </Box>
    </Box>
   </Container>
  </Box>
 );
};

export default Home;
