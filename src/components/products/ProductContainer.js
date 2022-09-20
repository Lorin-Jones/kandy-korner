import { useState } from "react"
import { ProductList } from "./Products"
import { ProductSearch } from "./ProductSearch"



export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
            <header>What Candy Are You Looking For?</header>
            <ProductSearch setterFunction={setSearchTerms} />
            <ProductList searchTermState={searchTerms} />
        </>
}

