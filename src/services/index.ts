import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// Create an instance of axios
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        toast.error('Request failed, please try again.');
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');

        if (config.url?.includes('/api/upload')) {
            config.timeout = 120000;
        }

        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
apiClient.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');

        if (config.url?.includes('/api/chat')) {
            config.timeout = 120000;
        }

        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Optionally, show a success toast for successful requests
        toast.success('Request successful!');
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);
            switch (error.response.status) {
                case 401:
                    toast.error('Unauthorized access. Please log in again.');
                    break;
                case 403:
                    toast.error('You do not have permission for this action.');
                    break;
                case 404:
                    toast.error('Resource not found.');
                    break;
                default:
                    toast.error('An error occurred. Please try again.');
                    break;
            }
        } else if (error.request) {
            console.error('Request error:', error.request);
            toast.error('Network error. Please check your connection.');
        } else {
            console.error('Error:', error.message);
            toast.error('An unexpected error occurred.');
        }
        return Promise.reject(error);
    }
);

// Export the apiClient for use in your application
export default apiClient;
