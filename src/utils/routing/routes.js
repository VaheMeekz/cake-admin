import NotFound from "../../components/404/404";
import AboutUs from "../../components/aboutUs/AboutUs";
import Banners from "../../components/banners/Banners";
import Category from "../../components/category/Category";
import ContactUs from "../../components/contactUs/ContactUs";
import Info from "../../components/info/Info";
import Login from "../../components/login/Login";
import Orders from "../../components/orders/Orders";
import Products from "../../components/products/Products";
import Subscribers from "../../components/subscribers/subscribers";
import Users from "../../components/users/Users";
import {
    ABOUTUS_PAGE,
    BANNERS_PAGE,
    CATEGORY_PAGE, CHOOSE_PAGE,
    CONTACTS_PAGE, DELEVERY_PAGE, FOOTER_PAGE,
    INFO_PAGE, JURISPRUDECE_PAGE,
    LOGIN_PAGE,
    NOTFOUND_PAGE,
    ORDERS_PAGE,
    PRODUCT_PAGE,
    SUBSCRIBERS_PAGE,
    USERS_PAGE,
} from "./urls";
import Delevery from "../../components/delevery/Delevery";
import Footer from "../../components/footer/Fotter";
import Choose from "../../components/choose/Choose";
import Jurisrudece from "../../components/jurisrudece/Jurisrudece";

export const isAuthPages = [
    {id: 1, path: USERS_PAGE, name: "Users", Component: Users},
    {id: 2, path: PRODUCT_PAGE, name: "Products", Component: Products},
    {id: 9, path: ORDERS_PAGE, name: "Orders", Component: Orders},
    {id: 8, path: CATEGORY_PAGE, name: "Category", Component: Category},
    {id: 10, path: DELEVERY_PAGE, name: "Delivery", Component: Delevery},
    {id: 11, path: FOOTER_PAGE, name: "Footers", Component: Footer},
    {id: 3, path: ABOUTUS_PAGE, name: "About Us", Component: AboutUs},
    {id: 12, path: CHOOSE_PAGE, name: "Choose", Component: Choose},
    {id: 3, path: JURISPRUDECE_PAGE, name: "Jurisrudece", Component: Jurisrudece},
    {id: 4, path: CONTACTS_PAGE, name: "Contact Us", Component: ContactUs},
    {id: 5, path: SUBSCRIBERS_PAGE, name: "Subscribers", Component: Subscribers},
    {id: 6, path: BANNERS_PAGE, name: "Banners", Component: Banners},
    {id: 7, path: INFO_PAGE, name: "Info", Component: Info},
];

export const isntAuthPages = [
    {id: 1, path: LOGIN_PAGE, name: "Login", Component: Login},
];

export const notFoundPages = [
    {id: 1, path: NOTFOUND_PAGE, name: "404", Component: NotFound},
];
