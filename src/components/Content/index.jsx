import { Suspense } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import { routes } from "../../routes";

const Content = () => {
  return (
    <div className="content">
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {routes.map(
            ({
              path,
              exact,
              isProtected,
              component: Component,
              isNotLoggedOn,
            }) =>
              isProtected ? (
                <PrivateRoute
                  key={path}
                  path={path}
                  exact={exact}
                  component={Component}
                />
              ) : (
                <PublicRoute
                  key={path}
                  path={path}
                  exact={exact}
                  component={Component}
                  isNotLoggedOn={isNotLoggedOn}
                />
              )
          )}
        </Switch>
      </Suspense>
    </div>
  );
};

export default Content;
