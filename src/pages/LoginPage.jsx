import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/operations";
import Button from "@material-ui/core/Button";

const useStyles = createUseStyles({
  login: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    height: "25px",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("test.user.two@mail.com");
  const [password, setPassword] = useState("12345678");
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { email, password };
    dispatch(login(payload));
  };

  return (
    <div className={classes.login}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
          <label className={classes.label}>
            <span>email: </span>
            <input type="email" value={email} onChange={handleChangeEmail} />
          </label>
          <label className={classes.label}>
            <span>password: </span>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
