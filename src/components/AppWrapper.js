import { Switch, Route } from "react-router-dom";
import { StoreContextProvider } from "../context/store";
import { AccountWrapper } from "./account/AccountWrapper";
import { ChangePasswordForm } from "./account/forms/change-password-form";
import { Aktivacija } from "./auth/Aktivacija";
import { Login } from "./auth/Login";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Registracija } from "./auth/Registracija";
import { Home } from "./home/Home";

const AppWrapper = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Registracija />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute
          exact={true}
          path="/home"
          component={<Home />}
        ></PrivateRoute>
        <PrivateRoute
          exact={true}
          path="/account"
          component={<AccountWrapper />}
        ></PrivateRoute>
        <Route path="/change-password" exact>
          <ChangePasswordForm />
        </Route>
        <Route path="/aktivacija/:email" exact>
          <Aktivacija />
        </Route>
      </Switch>
    </>
  );
};

export { AppWrapper };
