import axios from 'axios';

axios.defaults.withCredentials = true

// Create an instance of Axios
const apiUtil = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Set your base URL here
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiUtil.interceptors.request.use(
    (config) => {
        // You can add token or other custom headers here
        // Example: config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
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