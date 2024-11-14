import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.returnTo?.pathname || "/";

  const onSuccessCallback = () => {
    navigate(returnTo, { replace: true });
  };

  return (
    <>
      {showLogin ? (
        <div className="mb-36 mt-2.5">
          <LoginForm
            onSuccessCb={onSuccessCallback}
            goToSignup={() => setShowLogin(false)}
          />
        </div>
      ) : (
        <div className="mb-20 mt-2.5">
          <SignupForm
            onSuccessCb={onSuccessCallback}
            goToLogin={() => setShowLogin(true)}
          />
        </div>
      )}
    </>
  );
};

export default Login;
