import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../../public/logo-black.png"
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");

      closeModal();
    }
  };

  return (
    <>
    <img src={logo} className="login-business-logo" onClick={() => navigate("/")} />
    <div className="login-modal-container" >
    <div className="login-form-container" >
      <h1 className="login-header" >Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="credential-label">
          Email
          <br />
          <input
          className="login-input-area"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        {errors.email && <p>{errors.email}</p>}
        <label className="credential-label">
          Password
          <br />
          <input
            className="login-input-area"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errorsl'>{errors.password}</p>}
        <div className='login-buttons-cont'>

          <button type="submit" className="login-button" disabled={email.length === 0 || password.length === 0}>Log In</button>
          <button onClick={demoLogin} className="demo-user">Demo User</button>
        </div>
      </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
