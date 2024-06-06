import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Status, StatusApiResponse, StatusContextType } from '../types';



const DataContext = createContext<StatusContextType>({
    statuses: null,
    statusesLoading: true,
});

// Custom hook to consume the context
export const useStatus = () => useContext(DataContext);

// Data provider component
function StatusProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<Status[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_URL
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/status`);
                const result: StatusApiResponse = await response.json();
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ statuses: data, statusesLoading: loading }}>
            {children}
        </DataContext.Provider>
    );
};

export default StatusProvider