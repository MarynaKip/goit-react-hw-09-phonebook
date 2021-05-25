import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = (props) => {
  const isLoggedOn = useSelector((state) => state.user.isLoggedOn);
  const { isNotLoggedOn } = props;

  return !isNotLoggedOn || (isNotLoggedOn && !isLoggedOn) ? (
    <Route {...props} />
  ) : (
    <Redirect to="/contacts" />
  );
};

export default PublicRoute;
