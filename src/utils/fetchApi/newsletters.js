import { baseApi } from './api';

export const getAllNewsletters = async (setLoadingState, setData, { limit, page }) => {
  setLoadingState(true);
  return baseApi
    .get(`/newsletters?limit=${limit}&page=${page}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const getNewsletterById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/newsletters/${id}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const createNewsletter = async (setAlert, data) => {
  return baseApi
    .post(`/newsletters`, data)
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

export const updateNewsletter = async (setAlert, data) => {
  return baseApi
    .put(`/newsletters/${data.id}`, data)
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

export const deleteNewsletter = async (setLoadingState, setAlert, id) => {
  setLoadingState(true);
  return baseApi
    .delete(`/newsletters/${id}`)
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
    })
    .finally(() => {
      setLoadingState(false);
    });
};