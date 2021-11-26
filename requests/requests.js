import { API_URL, LOGIN_HEADER, PASSWORD_HEADER } from "../const/api";

export const getRole = async (login, password) => {
  const result = await getRequest(
    `${API_URL}users?select=role&name=eq.${login}`,
    login,
    password
  );

  if (result) return result[0].role;
  return undefined;
};

export const getTariffs = async (login, password) => {
  const result = await getRequest(`${API_URL}tariffs`, login, password);

  if (result) return result;
  return undefined;
};

export const getServices = async (login, password) => {
  const result = await getRequest(`${API_URL}services`, login, password);

  if (result) return result;
  return undefined;
};

const getRequest = async (url, login, password) => {
  try {
    const response = await fetch(url, {
      type: "GET",
      headers: {
        [LOGIN_HEADER]: login,
        [PASSWORD_HEADER]: password,
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};
