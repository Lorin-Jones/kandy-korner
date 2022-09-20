import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email, address }) => {
    return <section className="employee">
        <div>
            <label id={`employee--${id}`}>Name: {fullName}</label>    
        </div>
        <div>Email: {email}</div>
        <div>Location: {address}</div>
    </section>
}