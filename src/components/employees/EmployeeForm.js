import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const EmployeeForm = () => {
 
    
    const [employee, updateEmployee] = useState({
        locationId: (0),
        startDate: "",
        payRate: "",
        userId: ""
    })

    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: true,
    })
    
    const navigate = useNavigate()
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        }
    )
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        
        const employeeToSendToApi = {
            locationId: employee.locationId,
            startDate: employee.startDate,
            payRate: employee.payRate
        }
    
        const userToSendToApi = {
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }
    
        return fetch(`http://localhost:8088/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToSendToApi)
            })
                .then(response => response.json())
                .then((parsedResponse) => {
                    employeeToSendToApi.userId = parsedResponse.id 
                    return fetch(`http://localhost:8088/employees`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(employeeToSendToApi)
                    })
                    .then(response => response.json())
                    .then(() => {
                        navigate("/employees")
                    })
                })
    }

    return (
        <form className="employeeForm">
        <h2 className="employeeForm__title">New Hire</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Employee Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="employee name"
                    value={user.fullName}
                    onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.fullName = evt.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="email"
                    value={user.email}
                    onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.email = evt.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
                    <label htmlFor="location">Location:</label>
                    {locations.map(
                        (location) => {
                            return <div className="location-list">
                    <input
                       
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.locationId = evt.target.value
                                updateEmployee(copy)
                            }
                        } type="radio" value={location.id} name="location" /> {location.address}
                </div>
                    }
                )}
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="start_date">Start Date:</label>
                <input
                    type="date"
                    class="input"
                    className="form-control"
                    placeholder="start date"
                    value={employee.startDate}
                    onChange={
                        (evt) => {
                            const copy = {...employee}
                            copy.startDate = evt.target.value
                            updateEmployee(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="pay">Hourly Rate: $</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="hourly rate"
                    value={employee.payRate}
                    onChange={
                        (evt) => {
                            const copy = {...employee}
                            copy.payRate = evt.target.value
                            updateEmployee(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Submit Employee
        </button>
        </form>
    
    )
}

