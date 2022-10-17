// Services
import { axiosApiService } from '@/services/axios';

// Types
import { IPageQuery } from './types';

export const githubApiService = (function () {

    /**
  *
  * @param payload contains accessToken
  * @returns Promise
  */
    const getGithubListData = (queryParams: IPageQuery) => {

        const queryTerm = `q=` + encodeURIComponent((queryParams?.searchText || '').toLowerCase());
        const queryPerPage = `&per_page=${queryParams?.limit}`;
        const queryPage = `&page=${queryParams?.currentPage || 1}`;
        const queryString =
            queryTerm + queryPerPage + queryPage;

        return axiosApiService.core.get(`/search/${queryParams?.filter}?${queryString}`);
    }
    /**
     * NOTE: only declare methods you need to export from this service in this return object.
     */
    return {
        getGithubListData
    };
})();
