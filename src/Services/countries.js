import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1";

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/all`);
  return request.data;
};

const getSingle = async (name) => {
  const request = await axios.get(`${baseUrl}/name/${name}`);
  return request.data;
};

export default { getAll, getSingle };
