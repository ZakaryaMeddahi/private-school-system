import "../globals.css";
import Providers from "../provider";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";

const Layout = ({ children }) => {
    return (
        <body>
            {children}
            <Footer />
        </body>
    );
}

export default Layout;