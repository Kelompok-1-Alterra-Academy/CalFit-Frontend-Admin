import baseApi from "./api";

export default async function auth(setAlert, path, { email, password }) {
  // await fetch("http://localhost:8080/api/v1/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email,
  //     password,
  //   }),
  // });
  try {
    const { data } = await baseApi.post(`/auth/${path}`, {
      email,
      password,
    });
    return data;
  } catch (e) {
    setAlert({
      status: true,
      message: e.response.data.message,
    });
    return e.response.data;
  }
}
