import { API_URL, LOGIN_HEADER, PASSWORD_HEADER } from "../const/api";

// GET

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
      method: "GET",
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

// POST

export const setTariff = async (login, password, tariff) => {
  const result = await postRequest(
    `${API_URL}tariffs`,
    login,
    password,
    tariff
  );

  if (result) return result;
  else return undefined;
};

const postRequest = async (url, login, password, postData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        [LOGIN_HEADER]: login,
        [PASSWORD_HEADER]: password,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });

    return await response.status;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};

// DELETE

export const deleteTariff = async (login, password, id) => {
  const result = await deleteRequest(
    `${API_URL}tariffs?id=eq.${id}`,
    login,
    password
  );

  if (result) return result;
  else return undefined;
};

const deleteRequest = async (url, login, password) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        [LOGIN_HEADER]: login,
        [PASSWORD_HEADER]: password,
      },
    });

    return await response.status;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};
