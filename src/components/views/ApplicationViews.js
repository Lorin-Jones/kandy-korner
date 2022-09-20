
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"
// import { TicketForm } from "../tickets/TicketForm"

export const ApplicationViews = () => {
	const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    if (KandyUserObject.staff) {
        return <EmployeeViews />
    } 
    else {
        return <CustomerViews />
    }
}