import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

export default baseApi;
// export { baseApi};
