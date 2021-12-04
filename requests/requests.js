import { API_URL, LOGIN_HEADER, PASSWORD_HEADER } from "../const/api";

// GET

export const getRole = async (login, password) => {
  const result = await getRequest(
    `${API_URL}users?select=role&name=eq.${login}`,
    login,
    password
  );

  if (result[0] !== undefined) return result[0].role;
  return undefined;
};

export const getTariffs = async (login, password) => {
  const result = await getRequest(`${API_URL}tariffs`, login, password);

  if (result) return result;
  return undefined;
};

export const getTariff = async (login, password, tariffName) => {
  const result = await getRequest(
    `${API_URL}tariffs?name=eq.${tariffName}`,
    login,
    password
  );

  if (result[0]) return result[0];
  return undefined;
};

export const getServices = async (login, password) => {
  const result = await getRequest(`${API_URL}services`, login, password);

  if (result) return result;
  return undefined;
};

export const getService = async (login, password, serviceName) => {
  const result = await getRequest(
    `${API_URL}services?name=eq.${serviceName}`,
    login,
    password
  );

  if (result[0]) return result[0];
  return undefined;
};

export const getCustomer = async (
  login,
  password,
  passportSeries,
  passportNumber
) => {
  const result = await getRequest(
    `${API_URL}customers?passport_series=eq.${passportSeries}&passport_number=eq.${passportNumber}`,
    login,
    password
  );

  if (result) return result;
  return undefined;
};

export const getSims = async (login, password, customerId) => {
  const result = await getRequest(
    `${API_URL}rpc/list_sims?customer_id=${customerId}`,
    login,
    password
  );

  if (result) return result;
  return undefined;
};

export const getSimTariff = async (login, password, simId) => {
  const result = await getRequest(
    `${API_URL}sim_tariffs?select=tariffs(name)&sim_id=eq.${simId}&order=date.desc&limit=1`,
    login,
    password
  );

  if (result[0]) return result[0];
  return undefined;
};

export const getSimServices = async (login, password, simId) => {
  const result = await getRequest(
    `${API_URL}services?select=id,name,description,daily_price,activation_fee,sim_services(active)&sim_services.sim_id=eq.${simId}&sim_services.limit=1&sim_services.order=date.desc`,
    login,
    password
  );

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

    //console.log(data);

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

export const setService = async (login, password, service) => {
  const result = await postRequest(
    `${API_URL}services`,
    login,
    password,
    service
  );

  if (result) return result;
  else return undefined;
};

export const createUser = async (login, password, user) => {
  const result = await postRequest(`${API_URL}users`, login, password, user);

  if (result) return result;
  else return undefined;
};

export const createCustomer = async (login, password, customer) => {
  try {
    const response = await fetch(`${API_URL}customers`, {
      method: "POST",
      headers: {
        [LOGIN_HEADER]: login,
        [PASSWORD_HEADER]: password,
        "Content-Type": "application/json;charset=utf-8",
        Prefer: "return=representation",
      },
      body: JSON.stringify(customer),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }

  return undefined;
};

export const changeTariff = async (login, password, data) => {
  const result = await postRequest(
    `${API_URL}sim_tariffs`,
    login,
    password,
    data
  );

  if (result) return result;
  else return undefined;
};

export const changeService = async (login, password, data) => {
  const result = await postRequest(
    `${API_URL}sim_services`,
    login,
    password,
    data
  );

  if (result) return result;
  else return undefined;
};

export const addSim = async (login, password, customerId, tariffId) => {
  const result = await postRequest(`${API_URL}rpc/give_sim`, login, password, {
    customer_id: customerId,
    tariff_id: tariffId,
  });

  if (result) return result;
  return undefined;
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
    console.log(response.status);
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

export const deleteService = async (login, password, id) => {
  const result = await deleteRequest(
    `${API_URL}services?id=eq.${id}`,
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

// PATCH

export const changePassword = async (login, pass, newPassword) => {
  const result = await patchRequest(
    `${API_URL}users?name=eq.${login}`,
    login,
    pass,
    {
      password: newPassword,
    }
  );

  if (result) return result;
  else return undefined;
};

export const changeRole = async (login, pass, userName, newRole) => {
  const result = await patchRequest(
    `${API_URL}users?name=eq.${userName}`,
    login,
    pass,
    {
      role: newRole,
    }
  );

  if (result) return result;
  else return undefined;
};

const patchRequest = async (url, login, password, patchData) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        [LOGIN_HEADER]: login,
        [PASSWORD_HEADER]: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    });

    return await response.status;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};
