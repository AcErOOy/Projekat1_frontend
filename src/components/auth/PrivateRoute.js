import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { StoreContext } from "../../context/store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const store = useContext(StoreContext);
  
  useEffect(() => {}, [store]);
  return (
    <Route
      {...rest}
      render={() => {
        return store.isLogedIn === true ? (
          Component
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export { PrivateRoute };
