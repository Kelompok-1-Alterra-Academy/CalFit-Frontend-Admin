import { baseApi } from './api';

export const getAllGyms = async (setLoadingState, setData, { limit, page }) => {
  setLoadingState(true);
  return baseApi
    .get(`/gyms?limit=${limit}&page=${page}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const getGymById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/gyms/${id}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const createGym = async (setAlert, data) => {
  return baseApi
    .post(`/gyms`, data)
    .then((res) => {
      setAlert({
        status: true,
        message: res.data.message,
      });
      return res;
    }).catch((err) => {
      setAlert({
        status: true,
        message: err,
      });
    });
}

export const updateGym = async (setAlert, data) => {
  return baseApi
    .put(`/gyms/${data.id}`, data)
    .then((res) => {
      setAlert({
        status: true,
        message: res.data.message,
      });
      return res;
    }).catch((err) => {
      setAlert({
        status: true,
        message: err,
      });
    });
}

export const deleteGym = async (setLoadingState, setAlert, id) => {
  setLoadingState(true);
  return baseApi
    .delete(`/gyms/${id}`)
    .then((res) => {
      setAlert({
        status: true,
        message: res.data.message,
      });
      return res;
    }).catch((err) => {
      setAlert({
        status: true,
        message: err,
      });
    }).finally(() => {
      setLoadingState(false);
    });
}
