import apiClient from "."; // Assuming apiClient is Axios configured
import { AxiosResponse } from "axios";

// Get user by ID
const getAiDataById = async (id: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.get(`/aidata/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Fetching AI data failed, please try again.";
        throw new Error(errorMessage);
    }
};

// Add new AI data
const addAiData = async (face_image: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.post("/aidata", { face_image });
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Failed to add AI data, please try again.";
        throw new Error(errorMessage);
    }
};

// Update AI data (Patch)
const updateAiData = async (id: string, face_image: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.patch(`/aidata/${id}`, { face_image });
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Failed to update AI data, please try again.";
        throw new Error(errorMessage);
    }
};

// Delete AI data by ID
const deleteAiData = async (id: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.delete(`/aidata/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Failed to delete AI data, please try again.";
        throw new Error(errorMessage);
    }
};

const upload = async (formData: FormData): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;  
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const chat = async (prompt:any): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.post('/chat', prompt);
        return response.data;  
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};


const aiService = {
    getAiDataById,
    addAiData,
    updateAiData,
    deleteAiData,
    upload,
    chat
};

export default aiService;
