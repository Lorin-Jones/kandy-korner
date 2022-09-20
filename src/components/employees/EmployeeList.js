import { useCallback, useState, useEffect } from "react"
import { Employee } from "./Employee"

import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
       }, 
       []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.user.id} 
                fullName={employee.user.fullName} 
                email={employee.user.email} 
                address={employee.location.address}/>)
        }
    </article>
}