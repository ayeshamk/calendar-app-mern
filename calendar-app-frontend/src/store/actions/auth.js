import { baseURL } from '../../helpers/baseURL'
export const register = async (user) =>
  await baseURL.post(`/auth/register`, user);

export const login = async (user) =>
  await baseURL.post(`/auth/login`, user);

// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
