import axiosInstance from "./axiosInstance";

const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export default fetchData;
