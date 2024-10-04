import { Navbar } from "../component/Navbar";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";

export function Admin() {
    return(
        <>
            <Header/>
            <Navbar/>
            <h1>
                Admin Page
            </h1>
            <Footer/>
        </>
    )
}