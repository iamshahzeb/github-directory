export interface IPageQuery {
    limit: number;
    searchText: string;
    filter: string;
    totalPages: number;
    totalElements: number;
    nextPage: number;
    currentPage: number;
}

export interface IUserResults {
    id: number;
    avatar_url: string;
    html_url: string;
    login: string;
}

export interface IRepoResults {
    id: number;
    full_name: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
}

export interface ISearchResults extends IUserResults, IRepoResults { }

export interface ISearchResponse {
    total_count: number;
    items: Partial<ISearchResults[]>;
}