import axios from "../config/axios";

const categories = () => {
  const path = `/categories`;
  return axios.get(path, JSON.stringify()).then((data) => data?.data);
};
const restaurants = (param) => {
  const path =
    param.categoryId !== ""
      ? `/restaurants?category.id=${param.categoryId}`
      : "/restaurants";
  return axios.get(path, JSON.stringify()).then((data) => data?.data);
};
const detail = (param) => {
  const path = `/restaurants/${param.id}`;
  return axios.get(path, JSON.stringify()).then((data) => data?.data);
};
export const DetailApi = { detail };
export const MainApi = { categories, restaurants };
