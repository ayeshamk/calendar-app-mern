import { baseURL } from "../../helpers/baseURL";

export const getRoomOrders = async (roomId) => await baseURL.get(`/orders/${roomId}/room-orders`);

export const newOrder = async (data) => {
    return await baseURL.post(`/orders`, data)
};

export const getOrder = async (orderId) => {
    return await baseURL.get(`/orders/${orderId}`)
}
