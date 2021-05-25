import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/user/operations";
import Button from "@material-ui/core/Button";

const useStyles = createUseStyles({
  register: {
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

const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("Test User 2");
  const [email, setEmail] = useState("test.user.two@mail.com");
  const [password, setPassword] = useState("12345678");

  const isLoading = useSelector((state) => state.user.isLoading);

  const handleChangeName = (e) => setName(e.target.value);

  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, password };
    dispatch(register(payload));
  };

  return (
    <div className={classes.register}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
          <label className={classes.label}>
            <span>name: </span>
            <input type="name" value={name} onChange={handleChangeName} />
          </label>
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
            Register
          </Button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
