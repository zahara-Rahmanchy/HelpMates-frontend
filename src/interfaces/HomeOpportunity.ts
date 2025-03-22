export interface OpporsProps {
    requests: [] | null;
    skills: string[] | null;
    error?: string;
  }
export interface IQueryParams {
    searchTerm?: string;
    start_date?: string;
    skills?: string;
    sortBy?: string;
    sortOrder?: string;
  }