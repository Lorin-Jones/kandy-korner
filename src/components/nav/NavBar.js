import { Link, useNavigate } from "react-router-dom"
import { EmployeeNav } from "./EmployeeNav" 
import { CustomerNav } from "./CustomerNav"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    if (KandyUserObject.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }

    
}

