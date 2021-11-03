import { baseURL } from "../../helpers/baseURL";
export const register = async (user) =>
  await baseURL.post(`/auth/register`, user);

export const login = async (user) => {
  //write axios
  const res = await baseURL.post(`/auth/login`, user);
  baseURL.defaults.headers.common["Authorization"] = `Token ${res.data.token}`;
  return res;
};

// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
