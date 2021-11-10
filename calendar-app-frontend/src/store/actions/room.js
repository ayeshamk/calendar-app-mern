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

export const deleteRoom = async (roomId) =>
  await baseURL.delete(`rooms/${roomId}`);

export const getRoom = async (roomId) =>
  await baseURL.get(`/rooms/${roomId}`);

export const updateRoom = async (data, roomId) =>
  await baseURL.put(
    `/rooms/${roomId}`,
    data
  );
