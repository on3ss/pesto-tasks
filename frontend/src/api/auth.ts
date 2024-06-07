import apiUtil from '../utils/apiUtil';

export const loginUser = async (email: string, password: string) => {
    await apiUtil.get(`/sanctum/csrf-cookie`);
    await apiUtil.post(`/login`, { email, password });
};

export const registerUser = async (name: string, email: string, password: string, confirmPassword: string) => {
    await apiUtil.get(`/sanctum/csrf-cookie`);
    await apiUtil.post(`/register`, { name, email, password, password_confirmation: confirmPassword });
};

export const logoutUser = async () => {
    await apiUtil.post(`/logout`);
};

export const getUserData = async () => {
    const response = await apiUtil.get(`/api/user`);
    console.log(response)
    return response.data;
};
