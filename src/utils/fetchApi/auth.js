import { baseApi } from "./api";
import { parseCookies } from "nookies";

export async function superadminLogin(setLoadingState, setAlert, { username, password }) {
  setLoadingState(true);
  return baseApi
    .post(`/superadmin/login`, {
      username,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err)
      setAlert({
        status: true,
        message: err?.data?.data?.message,
      });
      return err?.data?.data;
    }).finally(() => {
      setLoadingState(false);
    });
}

export async function superadminUpdatePassword(setLoadingState, setAlert, { username, password, newPassword }) {
  console.log("parseCookies", parseCookies()['token']);
  // setLoadingState(true);
  // const data = { username, password, newPassword };
  // // console.log(data)
  // // return 
  // const fetchUpdatePassword = await baseApi
  //   .put(`/superadmin`, data)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     setAlert({
  //       status: true,
  //       message: err?.data?.data?.message,
  //     });
  //     return err?.data?.data;
  //   }).finally(() => {
  //     setLoadingState(false);
  //   });
  // console.log("fetchUpdatePassword", fetchUpdatePassword)
  // return fetchUpdatePassword;

  setLoadingState(true);
  const data = { username, password, newPassword };
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}superadmin`, {
    method: "PUT",
    withCredentials: true,
    credentials: "include",
    connection: "keep-alive",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parseCookies()['token']}`,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      setLoadingState(false);
      return await res.json();
    });
}