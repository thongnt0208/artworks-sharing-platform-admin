/* eslint-disable import/no-cycle */
import { getAuthInfo, setNewAccessToken } from "src/utils/AuthUtil";

import useAxios from "./use-axios";

const useRefreshToken = () => {
  const authInfo = getAuthInfo();

  const refresh = async () => {
    const body = { refreshToken: authInfo?.accessToken }; 
    
    const response = await useAxios.post("/auth/refresh-token", body);
    if (response?.data?.isSuccess) {
      setNewAccessToken(response?.data?.result?.accessToken);
    }
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
