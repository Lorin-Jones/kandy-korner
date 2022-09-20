import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    // const navigate = useNavigate()

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        }
    )
    return <>
        <h2>Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location">
                            <header>{location.address}</header>
                            <footer>Square Feet: {location.squareFootage}</footer>
                        </section>
                    }
                )
            }
        </article>
        </>
}