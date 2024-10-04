import { Navbar } from "../component/Navbar";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { Outlet } from "react-router-dom";

export function Home() {
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}