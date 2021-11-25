import { API_URL, LOGIN_HEADER, PASSWORD_HEADER } from "../const/api";

export const getRole = async (login, password) => {
  try {
    const response = await fetch(
      `${API_URL}users?select=role&name=eq.${login}`,
      {
        type: "GET",
        headers: {
          [LOGIN_HEADER]: login,
          [PASSWORD_HEADER]: password,
        },
      }
    );

    const data = await response.json();

    return data[0].role;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};
