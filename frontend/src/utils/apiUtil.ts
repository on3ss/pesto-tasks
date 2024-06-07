import axios from 'axios';

// Create a base Axios instance
const apiUtil = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json'
    }
});

// Add request interceptor
apiUtil.interceptors.request.use(
    (config) => {
        // Add custom headers or tokens here if needed
        // Example: config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
apiUtil.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors here, like logging out users on 401 status
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors
        }
        return Promise.reject(error);
    }
);

export default apiUtil;