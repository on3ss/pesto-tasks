import { ReactNode, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { StatusApiResponse, StatusContextType } from '../types';
import apiUtil from '../utils/apiUtil';

const DataContext = createContext<StatusContextType>({
    statuses: null,
    statusesLoading: true,
});

export const useStatus = () => useContext(DataContext);

function StatusProvider({ children }: { children: ReactNode }) {
    const { data, isLoading } = useQuery<StatusApiResponse, Error>('statuses', async () => {
        const response = await apiUtil.get('/status');
        return response.data;
    });

    const statuses = data?.data ?? null;

    return (
        <DataContext.Provider value={{ statuses, statusesLoading: isLoading }}>
            {children}
        </DataContext.Provider>
    );
}

export default StatusProvider;
