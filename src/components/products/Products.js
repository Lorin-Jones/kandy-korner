import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [sorted, setSorted] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searched, setSearched] = useState({})
    const [userWantsToSeeTopPricedProducts, setTopPrice] = useState([false])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(response => response.json())
                .then((productArray) => {
                    
                    setProducts(productArray)
                })
        
            },
            []
    )

    //if searchtermstate is empty, set filtered to empty array
    useEffect(
        () => {
            if (searchTermState === "") {
                setFiltered([])
            }
            else {
                const searchedProducts = products.filter(product => 
                    product.product.toLowerCase().startsWith(searchTermState.toLowerCase()))
                setFiltered(searchedProducts)

            }
    }, [ searchTermState ])

    useEffect(
        () => { 
            const sortedArray = products.sort((a, b) => (a.product > b.product) ? 1 : -1)
            setSorted(sortedArray)
            
        },
        [products]
    )

    // if kandyuserobject.staff setfiltered to products, else empty array.
    useEffect(
        () => {
            if (KandyUserObject) {
                setFiltered(sorted)       
            }
            else {
                setFiltered([])
            }
        },
        [sorted]
    )

    useEffect(
        () => {
            if (userWantsToSeeTopPricedProducts) {
                const topPrice = products.filter(product => product.price > 2)
                setFiltered(topPrice)
            } else {
                setFiltered(products)
            }
        },
        [userWantsToSeeTopPricedProducts]
    )                      
                
            
        
    if (KandyUserObject.staff) {                
        return <>   
            {       
                <> 
                    <button onClick={() => {
                        setTopPrice(!userWantsToSeeTopPricedProducts) 
                    }}>
                        {
                            userWantsToSeeTopPricedProducts
                            ? "Hot Sellers"
                            : "All Products"
                        }
                    </button>
                    <button onClick={() => navigate("/product/create")}>Add Product</button>

                </>
            }    
                
            
                    <h2>Products</h2>

                    <article className="products">
                        {
                            filtered.map(
                                (product) => {
                                    return <section className="product">
                                        <header>{product.product}</header>
                                            <div>{product.productType.name}</div>
                                        <footer>Price: {product.price}</footer>
                                    </section>
                                }
                            )
                        }
                    </article>
                </>
    }
    else if (!KandyUserObject.staff && searchTermState) {
        return <>
            <h2>Products</h2>
            
            <article className="products">
                        {
                            filtered.map(
                                (product) => {
                                    return <section className="product">
                                        <header>{product.product}</header>
                                        <footer>Price: {product.price}</footer>
                                    </section>
                                }
                            )
                        }
                    </article>
                           
        </>
    }

    
}