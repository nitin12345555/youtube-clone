import axiosInstance from "./axiosInstance";

export default async function api({ method, url, data }) {
  const res = await axiosInstance({ method, url, data });
  return res.data;
}
