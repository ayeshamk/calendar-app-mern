import { baseURL } from "../../helpers/baseURL";

export const createRoom = async (data) => await baseURL.post(`/rooms`, data);

export const allRooms = async () => await baseURL.get(`/rooms`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const deleteRoom = async (token, hotelId) =>
  await baseURL.delete(`rooms/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getRoom = async (hotelId) =>
  await baseURL.get(`/rooms/${hotelId}`);

export const updateRoom = async (data, hotelId) =>
  await baseURL.put(
    `/rooms/${hotelId}`,
    data
  );
