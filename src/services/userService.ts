import apiClient from ".";

const getUserById = async (id: string) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Fetching failed, please try again.";
        throw new Error(errorMessage);
    }
};

const userServices = {
    getUserById,
};

export default userServices;
