/* eslint-disable */
// ----------------------------------------------------------------------


import { getFromLS, saveToLS } from './LocalStorageUtils';

/**
 * Save auth data to local storage
 *
 * @description This function saves data of logged-in user to local storage
 * @param data - The data to be saved
 * @returns boolean
 * @example
 * setAuthData({id: "t001", username: "thongnt"});
 * @author ThongNT
 * @version 1.0.0
 */
const setAuthInfo = (data) => {
  return saveToLS('authData', data);
};

/**
 * Update the access token in local storage
 *
 * @description This function updates the access token for the logged-in user in local storage
 * @param accessToken - The new access token to be set
 * @returns boolean
 * @example
 * setNewAccessToken("accessToken");
 * @author ThongNT
 * @version 1.0.0
 */
const setNewAccessToken = (accessToken) => {
  const authData = getFromLS('authData');
  authData.accessToken = accessToken;
  return saveToLS('authData', authData);
};

/**
 * Retrieve authentication information from local storage
 *
 * @description This function retrieves the authentication information of the logged-in user from local storage
 * @returns
 * {
 *  id;
 *  username;
 *  email;
 *  fullname;
 *  accessToken;
 *  refreshToken;
 *  role[] | string;
 *  aTExp: number;
 * }
 * @example
 * getAuthInfo();
 * @author ThongNT
 * @version 1.0.0
 */
const getAuthInfo = () => {
  console.log(getFromLS('authData'));
  return getFromLS('authData');
};

/**
 * Remove authentication information from local storage
 *
 * @description This function removes the authentication information of the logged-in user from local storage
 * @returns void
 * @example
 * removeAuthInfo();
 * @author ThongNT
 * @version 1.0.0
 */
const removeAuthInfo = () => {
  localStorage.removeItem('authData');
};

export { setAuthInfo, setNewAccessToken, getAuthInfo, removeAuthInfo };
