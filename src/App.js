import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import UserMenu from "./components/UserMenu";
import Content from "./components/Content";
import { getCurrentUser } from "./redux/user/operations";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isAuthorizing);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="body">
          <UserMenu />
          <Content />
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default App;
