import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductContainer } from "../products/ProductContainer"

// import { TicketForm } from "../tickets/TicketForm"

export const CustomerViews = () => {
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
                <Route path="product_search" element={ <ProductContainer /> } /> 


            </Route>
        </Routes>
    )
}