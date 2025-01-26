import axios from "axios";

export async function login(email, password) {
  const loginUrl = `http://127.0.0.1:8000/api/login/`;

  const response = await axios.post(loginUrl, { email, password });

  return response.data;
}

export async function logout(token) {
  const logoutUrl = `http://127.0.0.1:8000/api/logout/`;

  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.post(logoutUrl, {}, { headers });

  return response.data;
}
