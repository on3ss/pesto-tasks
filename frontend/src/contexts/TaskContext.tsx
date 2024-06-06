import React, { createContext, useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { TaskListApiResponse, TaskContextType, QueryParams } from '../types';
import apiUtil from '../utils/apiUtil';

const TaskContext = createContext<TaskContextType>({
    tasks: null,
    tasksLoading: true,
    queryParams: {},
    updateQueryParams: () => { },
    isError: false,
    currentPage: 1,
    startPage: 1,
    lastPage: 1,
    endPage: 1,
    goToPage: () => { }
});

export const useTask = () => useContext(TaskContext);

function TaskProvider({ children }: { children: React.ReactNode }) {
    const [queryParams, setQueryParams] = useState({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const { data, isLoading, isError } = useQuery<TaskListApiResponse, Error>(
        ['tasks', currentPage, queryParams],
        async () => {
            const mergedParams = {
                ...queryParams,
                'page': currentPage
            }
            const response = await apiUtil.get('/task', { params: mergedParams });
            return response.data;
        }
    );

    const tasks = data?.data ?? null;
    const lastPage = data?.meta?.last_page ?? 1;

    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(lastPage, startPage + 6);

    const updateQueryParams = (newQueryParams: QueryParams) => {
        goToPage(1)
        setQueryParams(prevQueryParams => ({
            ...prevQueryParams,
            ...newQueryParams
        }));
    };

    return (
        <TaskContext.Provider value={{ tasks, tasksLoading: isLoading, queryParams, updateQueryParams, isError, currentPage, startPage, lastPage, endPage, goToPage }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider
