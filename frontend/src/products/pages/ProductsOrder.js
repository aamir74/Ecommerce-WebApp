import { React, useContext, useEffect, useState } from 'react'
import MainNavigation from '../components/MainNavigation'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'

import './ProductsCart.css'
import CartList from '../components/CartList'
import { AuthContext } from '../../shared/components/context/auth-context'

const ProductsOrder = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [loadedProduct, setLoadedProduct] = useState()
    //const [availability, setAvailability] = useState()
    //const [productId, setProductId] = useState()

    const axios = require('axios').default
    const auth = useContext(AuthContext)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/products/user/order`, {
            headers: {
                Authorization:'Bearer '+ auth.token
            }
        })
            .then(function (response) {
                // handle success

                setLoadedProduct(response.data.products)

                console.log(response.data.products)
                console.log('success')
                setIsLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log('error')
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    },[])

    const clearHandler = () => {
        setError(null)
    }

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearHandler} />
            <MainNavigation />
            {!isLoading && loadedProduct && <CartList type={'order'} items={loadedProduct} />}
        </>
    )
}

export default ProductsOrder
