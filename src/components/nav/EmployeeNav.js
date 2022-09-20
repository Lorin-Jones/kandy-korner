import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)    
    
    return (
        <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/locations">Locations</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/customers">Customers</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/employees">Employees</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/new_hire">New Hire</Link>
                </li>
                {
                    localStorage.getItem("kandy_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("kandy_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
                }
    </ul>
    )

}