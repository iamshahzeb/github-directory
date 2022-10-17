export interface PageQuery {
    limit: number;
    searchText: string;
    filter: string;
    totalPages: number;
    totalElements: number;
    nextPage: number;
    currentPage: number;
}