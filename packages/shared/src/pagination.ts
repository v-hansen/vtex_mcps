/**
 * Pagination types and defaults for VTEX API responses.
 */

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  from?: number;
  to?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total?: number;
    hasMore: boolean;
  };
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
