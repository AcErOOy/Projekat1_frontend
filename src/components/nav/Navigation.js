import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import styles from "./Navigation.module.css";
import "./Navigations.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";

const Navigation = () => {
  const store = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {}, [store]);

  const menuItems = () => {
    let items;
    return (items = [
      {
        label: <Link to={store.isLogedIn ? "/home" : "#"}>Home</Link>,
        key: "home",
        disabled: !store.isLogedIn
      },
      {
        label: <Link to={store.isLogedIn ? "/account" : "#"}>Account</Link>,
        key: "account",
        disabled: !store.isLogedIn
      },
      {
        label: (
          <img
            alt="dusan"
            src={require("../../icon.png")}
            style={{ width: "30px" }}
          ></img>
        ),
        key: "icon",
        disabled: true,
      },
      {
        label: <Link to={!store.isLogedIn ? "/" : "#"}>Register</Link>,
        key: "Register",
        disabled: store.isLogedIn
      },
      {
        label: <Link to={!store.isLogedIn ? "/login" : "#"}>Login</Link>,
        key: "Login",
        disabled: store.isLogedIn
      },
      {
        label: (
          <div
            onClick={() => {
              store.setIsLogedIn(false);
              localStorage.removeItem("korisnik_id");
              history.push("/");
            }}
          >
            Logout
          </div>
        ),
        key: "Logout",
        disabled: !store.isLogedIn
      },
    ]);
  };
  console.log(store.isLogedIn)
  return (
    <Menu
      className={styles.antMenuHorizontal}
      style={{ display: "flex", justfiyContent: "center" }}
      items={menuItems()}
      mode="horizontal"
    />
  );
};

export { Navigation };
