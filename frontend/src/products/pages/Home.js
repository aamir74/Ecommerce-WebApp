import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductsList from '../components/ProductsList'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import MainNavigation from '../components/MainNavigation'
import ProductList from '../components/ProductList'
import { SliderData } from '../components/ImageData'
import ImageSlider from '../components/ImageSlider'
import { AuthContext } from '../../shared/components/context/auth-context'

const Products = () => {

  const axios = require('axios').default
  const auth = useContext(AuthContext)

  const [loadedProducts, setLoadedProducts] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    console.log('product')
    setIsLoading(true)
    axios.get('http://localhost:5000/api/products')
      .then(function (response) {
        // handle success
        console.log(response.data.products);

        setLoadedProducts(response.data.products)
        setIsLoading(false)

      })
      .catch(function (error) {
        // handle error
        setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
        setIsLoading(false)
      })

  }, [])

  useEffect(() => {
    console.log('cart')
    if (auth.isLoggedIn) {
      axios.get(`http://localhost:5000/api/products/user/cart`, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      })
        .then(function (response) {
          // handle success
          auth.cart(response.data.products.length)
          console.log('success')
        })
    }
  }, [auth.cart])



  const clearHandler = () => {
    setError(null)
  }

  return <React.Fragment>

    <ErrorModal error={error} onClear={clearHandler} />
    <MainNavigation />
    <ImageSlider slides={SliderData} />
    {!isLoading && loadedProducts && <ProductsList items={loadedProducts} />}
    {!isLoading && loadedProducts && <ProductList items={loadedProducts} />}
    {isLoading && <LoadingSpinner asOverlay />}



  </React.Fragment>
}
export default Products