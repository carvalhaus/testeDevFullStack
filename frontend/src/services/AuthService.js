import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

export async function login(email, password) {
  const loginUrl = `${API_URL}login/`;

  const response = await axios.post(loginUrl, { email, password });

  return response.data;
}

export async function logout(token) {
  const logoutUrl = `${API_URL}logout/`;

  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.post(logoutUrl, {}, { headers });

  return response.data;
}
