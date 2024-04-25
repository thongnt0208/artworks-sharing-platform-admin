import { BASE_URL, axiosPrivate } from 'src/hooks/use-axios';

/**
 *
 * This function validates the access token
 *
 * @param setIsLogin (opt) - set the login status
 * @returns true if the access token is valid, false otherwise
 * @version 1.2.0
 * @author @thongnt0208
 */
export async function ValidateAccessToken() {
  try {
    const res = await axiosPrivate.get(`${BASE_URL}/auth/validate-access-token`);
    console.log('ValidateAccessToken: ', res);

    // setIsLogin(true);
    return true;
  } catch (error) {
    // setIsLogin(false);
    console.log(error);
    return false;
  }
}
