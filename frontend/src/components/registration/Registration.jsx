/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import useApi from "../../services/useApi";
import "./Registration.css";

const Registration = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [success, setSuccess] = useState(false);

  const api = useApi();

  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  useEffect(() => {
    const result = PWD_REDEX.test(password);
    setValidPwd(result);
    const match = password === confirmPassword;
    setValidMatch(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = MAIL_REDEX.test(mail);
    setValidMail(result);
  }, [mail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      firstname,
      mail,
      password,
    };
    api
      .post("/users/", newUser)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="registration-container">
      {success ? (
        <section>OK, you can connect</section>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <TextField
            className="registration-input"
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            className="registration-input"
            label="First name"
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            className="registration-input"
            label="Mail"
            type="mail"
            aria-invalid={validMail ? "false" : "true"}
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <span
            className={validMail || !mail ? "signup-hide" : "signup-invalid"}
          >
            Email is not valid
          </span>
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
          <span
            className={validPwd || !password ? "signup-hide" : "signup-invalid"}
          >
            Must contain 1 lowercase, 1 uppercase, 1 number, 1 character
            special, 8-24 characters
          </span>
          <TextField
            className="registration-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <span
            className={
              validMatch || !confirmPassword ? "signup-hide" : "signup-invalid"
            }
          >
            Passwords don't match
          </span>
          <Button
            className="registration-button"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!validMail || !validPwd || !validMatch}
          >
            Register
          </Button>
        </form>
      )}
    </div>
  );
};

export default Registration;
