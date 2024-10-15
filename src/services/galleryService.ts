import apiClient from ".";

interface GalleryItem {
    user_id: string;
    name: string;
    description: string;
    category: string; // e.g., portrait, landscape, abstract
}

const createGalleryItem = async (data: GalleryItem) => {
    try {
        const response = await apiClient.post("/gallery", data);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Creating gallery item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const getGalleryItem = async () => {
    try {
        const response = await apiClient.get(`/gallery`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Fetching gallery item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const getGalleryItemById = async (id: string) => {
    try {
        const response = await apiClient.get(`/gallery/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Fetching gallery item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
    try {
        const response = await apiClient.put(`/gallery/${id}`, data);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Updating gallery item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const deleteGalleryItem = async (id: string) => {
    try {
        const response = await apiClient.delete(`/gallery/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Deleting gallery item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const galleryServices = {
    createGalleryItem,
    getGalleryItem,
    getGalleryItemById,
    updateGalleryItem,
    deleteGalleryItem,
};

export default galleryServices;
