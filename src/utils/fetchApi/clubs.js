import baseApi from "./api";

export const getAllGyms = async (setLoadingState, setData, { limit, page }) => {
  setLoadingState(true);
  return (
    baseApi
      .get(`/gyms?limit=${limit}&page=${page}`)
      .then((res) => {
        setData(res.data.data ?? []);
      })
      // .catch((err) => {
      //   dispatch(alertSetMessage(err.message));
      //   dispatch(alertSetError(true));
      //   dispatch(alertSetSuccess(false));
      // })
      .finally(() => {
        setLoadingState(false);
      })
  );
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
