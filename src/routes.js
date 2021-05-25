import { lazy } from "react";

const ContactsPage = lazy(() =>
  import("./pages/ContactsPage" /* webpackChunkName: "contacts-page" */)
);

const LoginPage = lazy(() =>
  import("./pages/LoginPage" /* webpackChunkName: "login-page" */)
);

const RegisterPage = lazy(() =>
  import("./pages/RegisterPage" /* webpackChunkName: "register-page" */)
);

export const routes = [
  {
    path: "/contacts",
    label: "Contacts Page",
    component: ContactsPage,
    exact: true,
    isProtected: true,
  },
  {
    path: "/login",
    label: "Login Page",
    component: LoginPage,
    isProtected: false,
    isNotLoggedOn: true,
  },
  {
    path: "/register",
    label: "Register Page",
    component: RegisterPage,
    isProtected: false,
    isNotLoggedOn: true,
  },
];
