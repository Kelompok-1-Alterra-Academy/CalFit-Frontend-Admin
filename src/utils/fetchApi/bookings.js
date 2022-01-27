import { baseApi } from "./api";

export const getBookingsCount = async (setLoadingState, setData) => {
  setLoadingState(true);
  return baseApi
    .get('/bookings/count')
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};