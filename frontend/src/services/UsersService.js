import axios from "axios";

export async function getUsers() {
  const usersUrl = `http://127.0.0.1:8000/api/users/`;

  const response = await axios.get(usersUrl);

  return response.data;
}

export async function getUser(id) {
  const userUrl = `http://127.0.0.1:8000/api/users/${id}`;

  const response = await axios.get(userUrl);

  return response.data;
}
