import apiUtil from '../utils/apiUtil';

const BASE_URL = 'http://localhost:8000';

export const loginUser = async (email: string, password: string) => {
    await apiUtil.get(`${BASE_URL}/sanctum/csrf-cookie`);
    await apiUtil.post(`${BASE_URL}/login`, { email, password });
};

export const registerUser = async (name: string, email: string, password: string, confirmPassword: string) => {
    await apiUtil.get(`${BASE_URL}/sanctum/csrf-cookie`);
    await apiUtil.post(`${BASE_URL}/register`, { name, email, password, password_confirmation: confirmPassword });
};

export const logoutUser = async () => {
    await apiUtil.post(`${BASE_URL}/logout`);
};

export const getUserData = async () => {
    const response = await apiUtil.get(`/user`);
    console.log(response)
    return response.data;
};
