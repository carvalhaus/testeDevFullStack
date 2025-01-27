import axios from "axios";
import { API_URL } from "./AuthService";

export async function getUsers() {
  const usersUrl = `${API_URL}users/`;

  const response = await axios.get(usersUrl);

  return response.data;
}

export async function getUser(id) {
  const userUrl = `${API_URL}users/${id}`;

  const response = await axios.get(userUrl);

  return response.data;
}

export async function createUser(formData, token) {
  const createUrl = `${API_URL}users/`;

  const headers = { Authorization: `Bearer ${token}` };

  const newUser = {
    loggedUserLevel: formData.loggedUserLevel,
    email: formData.email,
    name: formData.name,
    password: formData.password,
    level: formData.userLevel,
  };

  const response = await axios.post(createUrl, newUser, { headers });

  return response.data;
}

export async function updateUser(formData, token, id) {
  const createUrl = `${API_URL}users/${id}`;

  const headers = { Authorization: `Bearer ${token}` };

  const updatedUser = {
    loggedUserLevel: formData.loggedUserLevel,
    email: formData.email,
    name: formData.name,
    password: formData.password,
    level: formData.userLevel,
  };

  const response = await axios.put(createUrl, updatedUser, { headers });

  return response.data;
}

export async function deleteUser(token, id, loggedUserLevel) {
  const deleteUrl = `${API_URL}users/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    loggedUserLevel: loggedUserLevel,
  };

  const response = await axios.delete(deleteUrl, { headers });

  return response.data;
}
