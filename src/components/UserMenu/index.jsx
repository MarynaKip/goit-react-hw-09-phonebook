import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { routes } from "../../routes";
import { NavLink, Redirect } from "react-router-dom";
// import { A } from "hookrouter";
import { createUseStyles } from "react-jss";
import Button from "@material-ui/core/Button";
import { logout } from "../../redux/user/operations";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = createUseStyles({
  menu: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-start",
  },
  link: {
    color: "green",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    width: "150px",
    height: "25px",
  },
  active: {
    color: "rgb(59, 138, 255)",
  },
});

const checkShowPage = (isProtected, isLoggedOn, isNotLoggedOn) => {
  const showProtected = !isProtected || (isProtected && isLoggedOn);
  const showLoggedOn = !isNotLoggedOn || (isNotLoggedOn && !isLoggedOn);

  return showProtected && showLoggedOn;
};

const UserMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedOn = useSelector((state) => state.user.isLoggedOn);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => dispatch(logout());
  return (
    <div className={classes.container}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        {routes.map(({ path, exact, label, isProtected, isNotLoggedOn }) => {
          const showInMenu = checkShowPage(
            isProtected,
            isLoggedOn,
            isNotLoggedOn
          );

          return showInMenu ? (
            // <A href={path} key={path} className={classes.link}>
            //   {label}
            // </A>
            <MenuItem onClick={handleClose}>
              <NavLink
                activeClassName={classes.active}
                key={path}
                exact={exact}
                to={path}
              >
                {label}
              </NavLink>
            </MenuItem>
          ) : null;
        })}
      </Menu>
      {isLoggedOn && (
        <Button
          onClick={handleLogOut}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
