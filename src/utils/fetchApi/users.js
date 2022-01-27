import { baseApi } from "./api";

export const getUsersCount = async (setLoadingState, setData) => {
  setLoadingState(true);
  return baseApi
    .get('/users/count')
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};