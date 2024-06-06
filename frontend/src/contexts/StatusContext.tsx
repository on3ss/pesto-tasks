import { ReactNode, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { StatusApiResponse, StatusContextType } from '../types';
import apiUtil from '../utils/apiUtil';

const StatusContext = createContext<StatusContextType>({
    statuses: null,
    statusesLoading: true,
});

export const useStatus = () => useContext(StatusContext);

function StatusProvider({ children }: { children: ReactNode }) {
    const { data, isLoading } = useQuery<StatusApiResponse, Error>('statuses', async () => {
        const response = await apiUtil.get('/status');
        return response.data;
    });

    const statuses = data?.data ?? null;

    return (
        <StatusContext.Provider value={{ statuses, statusesLoading: isLoading }}>
            {children}
        </StatusContext.Provider>
    );
}

export default StatusProvider;
