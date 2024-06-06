import apiUtil from "../utils/apiUtil";

export const fetchTasks = async (page: number, search: string) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await apiUtil.get(`${baseUrl}/task`, {
        params: {
            page,
            'filter[name]': search,
        },
        headers: {
            'Accept': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error('Something went wrong! Could not fetch tasks');
    }

    return response.data;
};