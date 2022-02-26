/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Advertising from "views/advertising/Advertising";
import Consulting from "views/consulting/Consulting";
import Contact from "views/contact/Contact";
import HomeScreen from "views/home/HomeScreen";
import Navigation from "views/navigation/Navigation";
import ProductDev from "views/productDev/ProductDev";
import Products from "views/products/Products";
import Reviews from "views/reviews/Reviews";
import Register from "views/Register.js";
import Login from "views/Login.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/navigation",
    name: "Navigation",
    icon: "ni ni-square-pin text-primary",
    component: Navigation,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "Home Screen",
    icon: "ni ni-box-2 text-yellow",
    component: HomeScreen,
    layout: "/admin",
  },
  {
    path: "/reviews",
    name: "Reviews",
    icon: "ni ni-single-02 text-primary",
    component: Reviews,
    layout: "/admin",
  },
  {
    path: "/advertising",
    name: "Advertising",
    icon: "ni ni-notification-70 text-primary",
    component: Advertising,
    layout: "/admin",
  },
  {
    path: "/productDev",
    name: "Product Dev",
    icon: "ni ni-album-2 text-orange",
    component: ProductDev,
    layout: "/admin",
  },
  {
    path: "/consulting",
    name: "Consulting",
    icon: "ni ni-briefcase-24 text-success",
    component: Consulting,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-watch-time text-red",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/contact",
    name: "Contacts",
    icon: "ni ni-email-83 text-orange",
    component: Contact,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-key-25 text-info",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-circle-08 text-pink",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
