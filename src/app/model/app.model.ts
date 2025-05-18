import { IUser } from './user.model';

export interface IActionResponse<T = any>
{
    isSuccessful: boolean;
    payload: T;
}

export const isValidObject = (val: any): val is Object =>
{
    return typeof val === 'object' && val !== null;
};

export interface IPagination
{
    page: number;
    pageSize: number;
    total?: number;
}

export interface IFilters
{
    [k: string]: string[];
}

export interface IGridConfig
{
    rows: IUser[];
    pagination: IPagination;
    isLoading: boolean;
}

export interface IFetchUsersWithFiltersApiResponse {
    results: IUser[];
    total: number;
    page: number;
    pageSize: number;
}
