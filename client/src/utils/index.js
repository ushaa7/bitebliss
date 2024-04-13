import {jwtDecode} from 'jwt-decode';

export const validateAccessToken = (token) => {
  let isValid = false;
  const decoded = jwtDecode(token);
  const { exp } = decoded;
  if (Date.now() <= exp * 1000) isValid = true;
  return isValid;
};

