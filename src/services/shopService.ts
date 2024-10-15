import apiClient from ".";

interface ShopItem {
    user_id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    isWishlisted: boolean;
    isPremium: boolean;
    dimensions?: string;
    material?: string;
    category: string;
}

const createShopItem = async (data: ShopItem) => {
    try {
        const response = await apiClient.post("/shop", data);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Creating shop item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const getShopItemById = async (id: string) => {
    try {
        const response = await apiClient.get(`/shop/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Fetching shop item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const updateShopItem = async (id: string, data: Partial<ShopItem>) => {
    try {
        const response = await apiClient.put(`/shop/${id}`, data);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Updating shop item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const deleteShopItem = async (id: string) => {
    try {
        const response = await apiClient.delete(`/shop/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || "Deleting shop item failed, please try again.";
        throw new Error(errorMessage);
    }
};

const shopServices = {
    createShopItem,
    getShopItemById,
    updateShopItem,
    deleteShopItem,
};

export default shopServices;
