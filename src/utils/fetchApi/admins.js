import { baseApi } from './api';

export const getAllAdmins = async (setLoadingState, setData, { limit, page }) => {
  setLoadingState(true);
  return baseApi
    .get(`/superadmin/admin?limit=${limit}&page=${page}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const countAllAdmins = async (setAlert, data) => {
  return baseApi
    .put(`/superadmin/admins/count`, data)
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