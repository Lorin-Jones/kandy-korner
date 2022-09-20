import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [productObj, update] = useState({
        product: ""
    })
    const [productTypes, setProductTypes] = useState([])
    
    const navigate = useNavigate()
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(response => response.json())
                .then((productTypeArray) => {
                    setProductTypes(productTypeArray)
                })
        },
        []
    )    
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToApi = {
            product: productObj.product,
            productTypeId: productObj.productTypeId,
            price: productObj.price
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product">Name:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="product name"
                        value={productObj.product}
                        onChange={
                            (evt) => {
                                const copy = {...productObj}
                                copy.product = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="product price"
                        value={productObj.price}
                        onChange={
                            (evt) => {
                                const copy = {...productObj}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
            
                </div>
            </fieldset>
            <fieldset>
                    <label htmlFor="product-type">Product Type:</label>
                    {productTypes.map(
                        (productType) => {
                            return <div className="type-list">
                    <input
                       
                        onChange={
                            (evt) => {
                                const copy = {...productObj}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } type="radio" value={productType.id} name="product-type" /> {productType.name}
                </div>
                    }
                )}
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}