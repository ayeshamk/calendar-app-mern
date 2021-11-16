import { baseURL } from "../../helpers/baseURL";

export const getRoomOrders = async (roomId) => await baseURL.get(`/orders/${roomId}/room-orders`);

export const newOrder = async (data) => {
    return await baseURL.post(`/orders`, data)
};

export const patchOrder = async (orderId, data) => {
    return await baseURL.patch(`/orders/${orderId}`, data)
};

export const getOrder = async (orderId) => {
    return await baseURL.get(`/orders/${orderId}`)
}
