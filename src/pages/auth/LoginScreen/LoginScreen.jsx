/* eslint-disable */
// ----------------------------------------------------------------------

import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginScreen.scss";

import { InputText, Button, Toast, Divider, Image, Card } from "../../index";

import { login } from "../AuthService";
import logo from "../../../assets/logo/logo_notext.svg";
import logotext from "../../../assets/logo/logo.png";

import { jwtDecode } from "jwt-decode";
import { setAuthInfo } from "../../../utils/AuthUtil";

import { AuthContext } from "../../../auth/context/jwt/auth-provider";

const LoginScreen = ({ isLogin, setIsLogin, setAuthInfoChanged }) => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);

  const previousPath = location?.state?.from?.pathname;

  const handleLogin = () => {
    setIsLoading(true);
    login(username, password)
      .then((response) => {
        console.log(response);

        const { data } = response || {};
        const { userId: id, email, fullname, accessToken, refreshToken } = data || {};
        const decodedAToken = jwtDecode(accessToken);
        console.log(decodedAToken);
        const role = decodedAToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const exp = decodedAToken.exp;

        let currentUserData = { id, email, fullname, accessToken, refreshToken, role, aTExp: exp };

        console.log({ ...currentUserData });
        if (["ADMIN", "MODERATOR"].some((role) => role === currentUserData.role.toUpperCase())) {
          setAuthInfo(currentUserData); //set Auth info to LocalStorage
          setAuthInfoChanged(currentUserData); //notify to state at App.tsx that the user has logged in
          setIsLogin(!!id); // Assuming login is considered valid if 'id' exists
          setIsLoading(false);
          authContext.setAuthInfo(currentUserData); //set Auth info to Context

          toast.current.show({
            severity: "success",
            summary: "Đăng nhập thành công",
            detail: "Bạn sẽ được chuyển hướng trong 3 giây ...",
            life: 3000,
          });
          setTimeout(() => {
            navigate("/");
          }, 300);
        } else {
          setIsLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Không thể truy cập",
            detail: "Bạn không có quyền truy cập vào trang này.",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        let message = "Kiểm tra lại thông tin và thử lại sau.";
        if (error?.response?.status === 500) message = "Lỗi hệ thống, vui lòng thử lại sau.";
        if (error?.response?.status === 401) message = "Tên đăng nhập hoặc mật khẩu không đúng.";
        toast.current.show({
          severity: "error",
          summary: "Đăng nhập lỗi",
          detail: message,
          life: 3000,
        });
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="login-container flex w-100">
        <div className="background-overlay"></div>
        <div className="logo-container p-4 hidden lg:block">
          <Image alt="logo" src={logotext} height="100" />
        </div>
        <Card className="login-card">
          <div className="header-container pb-4">
            <div className="logo flex justify-content-start lg:hidden">
              <Image alt="logo" src={logo} height="40" />
              <h3 className="m-0">Artworkia</h3>
            </div>
            <h1>Đăng nhập</h1>
          </div>
          <div className="normal-login">
            <div className="username-container">
              <InputText
                id="username"
                value={username}
                placeholder="Tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="password-container">
              <InputText
                id="password"
                type="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                required
              />
            </div>
            <Button
              label="Tiếp tục"
              onClick={handleLogin}
              disabled={username && password ? false : true}
              loading={isLoading}
            />
          </div>

          <Divider />
          <div className="3party-login">
            <div className="google-login"></div>
            <div className="facebook-login"></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginScreen;
