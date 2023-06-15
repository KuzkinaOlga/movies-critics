/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const api = useApi();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      mail,
      password,
    };
    api
      .post("/login", user)
      .then((response) => {
        console.warn(response);
        // eslint-disable-next-line no-shadow
        const { token, user } = response.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(user);
        navigate("/blogs");
      })
      .catch((error) => {
        console.error(error);
        let errorMsg = "";
        switch (error?.response?.status) {
          case 401:
            errorMsg = "You dont autorised for connection";
            break;
          case 404:
            errorMsg = "User nonexistent";
            break;
          case 422:
            errorMsg = "Error in the data provided";
            break;
          default:
            errorMsg = "Server error";
        }
        alert(errorMsg);
      });
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <TextField
          className="registration-input"
          label="Mail"
          type="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          className="registration-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button
          className="registration-button"
          type="submit"
          variant="contained"
          color="primary"
          // disabled={!validMail || !validPwd || !validMatch}
        >
          Login
        </Button>
      </form>
      <div className="form-login_sub-container">
        <p>No account?</p>
        <NavLink className="form-login_sub-link" to="/registration">
          <p>Sign up</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
