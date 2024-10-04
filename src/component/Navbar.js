import { Link } from "react-router-dom";

export function Navbar() {
    return(
        <>
        <Link to="/product/list">Home</Link> | | 
        <Link to="/product/add">Create</Link> | |
        <Link to="/Admin">Admin</Link>
        </>
    )
}