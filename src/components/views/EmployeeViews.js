import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeForm } from "../employees/EmployeeForm"
import { EmployeeList } from "../employees/EmployeeList"
import { LocationList } from "../locations/Locations"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/Products"
// import { TicketForm } from "../tickets/TicketForm"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Bleak Sweets</h1>
                    <div>Corrupted Candy</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />

				<Route path="products" element={ <ProductList /> } />

                <Route path="/product/create" element={ <ProductForm /> } />

                <Route path="/new_hire" element={ <EmployeeForm /> } />

                <Route path="/employees" element={ <EmployeeList /> } />

                <Route path="/customers" element={ <CustomerList /> } />

                <Route path="customers/:customerId" element={ <CustomerDetails /> } />

            </Route>
        </Routes>
    )
}