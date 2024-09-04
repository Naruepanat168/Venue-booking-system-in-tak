import axios from "axios";

// Function to create a hotel
export const createHotel = async (formData, authToken) => {
  if (!formData || !authToken) {
    throw new Error("Missing required fields: formData and authToken");
  }

  const url = `${process.env.REACT_APP_API}/createhotel`;
  const headers = { authToken };

  try {
    const response = await axios.post(url, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw new Error("[API Error] ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

// Function to edit a hotel page
export const editHotelPage = async (formData, authToken) => {
  if (!formData || !authToken) {
    throw new Error("Missing required fields: formData and authToken");
  }

  const url = `${process.env.REACT_APP_API}/editeHotelPage`;
  const headers = { authToken };

  try {
    const response = await axios.post(url, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error editing hotel page:", error);
    throw new Error("[API Error] ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

// Function to list hotel data
export const listDataHotel = async (authToken, group) => {
  if (!authToken) {
    throw new Error("Missing required field: authToken");
  }

  const url = `${process.env.REACT_APP_API}/listDataHotel`;
  const headers = { authToken };
  const data = { group };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error listing hotel data:", error);
    throw new Error("[API Error] ไม่สามารถดึงข้อมูลโรงแรมได้");
  }
};

// Function to remove an image
export const removeImage = async (formData, authToken) => {
  if (!formData || !authToken) {
    throw new Error("Missing required fields: formData and authToken");
  }

  const url = `${process.env.REACT_APP_API}/removeImage`;
  const headers = { authToken };

  try {
    const response = await axios.post(url, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error removing image:", error);
    throw new Error("[API Error] ไม่สามารถลบรูปภาพได้");
  }
};

export const hotelAll = async () => {

  const url = `${process.env.REACT_APP_API}/hotelAll`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error listing hotel data:", error);
    throw new Error("[API Error] ไม่สามารถดึงข้อมูลโรงแรมได้");
  }
};
