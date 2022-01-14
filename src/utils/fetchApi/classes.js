import baseApi from "./api";

export const getAllClasses = async (
  setLoadingState,
  setData,
  { limit, page }
) => {
  setLoadingState(true);
  return baseApi
    .get(`/classes?limit=${limit}&page=${page}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};
