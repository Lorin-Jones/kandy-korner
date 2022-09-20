import { useCallback, useState, useEffect } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
       }, 
       []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id}
                loyaltyNumber={customer.loyaltyNumber} 
                fullName={customer.user.fullName} 
                email={customer.user.email} />)
        }
    </article>
}