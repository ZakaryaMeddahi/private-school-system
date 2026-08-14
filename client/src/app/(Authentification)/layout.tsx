import NavBar from "../../components/nav-bar/NavBar";
import Footer from "../../components/Footer/Footer";
import LoginProvider from "../providers/LoginProvider";

const Layout = ({ children }) => {
    return (
        <>
            {/* <NavBar /> */}
            <LoginProvider>{children}</LoginProvider>
            {/* <Footer /> */}
        </>
    );
}

export default Layout;