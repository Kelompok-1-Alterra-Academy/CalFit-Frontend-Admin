import { baseApi } from './api';

export const getAllClasses = async (setLoadingState, setData, { limit, page }) => {
  const url = limit ? `/classes?limit=${limit}&page=${page}` : `/classes`;
  setLoadingState(true);
  return baseApi
    .get(url)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const getClassesCount = async (setLoadingState, setData) => {
  setLoadingState(true);
  return baseApi
    .get("/classes/count")
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const getClassById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/classes/${id}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const createClass = async (setAlert, data, clubId) => {
  return baseApi
    .post(`/gyms/${clubId}/classes`, data)
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

export const updateClass = async (setAlert, data, clubId, classId) => {
  console.log('data', data);
  return baseApi
    .put(`/gyms/${clubId}/classes/${classId}`, data)
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

export const deleteClass = async (setLoadingState, setAlert, gymId, classId) => {
  setLoadingState(true);
  return baseApi
    .delete(`/gyms/${gymId}/classes/${classId}`)
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
