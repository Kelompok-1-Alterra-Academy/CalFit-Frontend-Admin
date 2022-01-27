import { baseApi } from "./api";

export const getBookingsByGymId = async (setLoadingState, setData, gymId, { limit }) => {
  limit = limit ? limit : 0;
  setLoadingState(true);
  return baseApi
    .get(`/bookings/gym/${gymId}?total=${limit}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

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

export const createBooking = async (setAlert, data, classId) => {
  return baseApi
    .post(`/classes/${classId}/bookings`, data)
    .then((res) => {
      setAlert({
        status: true,
        message: res.data.message,
      });
      return res;
    })
    .catch((err) => {
      setAlert({
        status: true,
        message: err,
      });
    });
};