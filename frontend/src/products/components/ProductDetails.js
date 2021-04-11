import React, { useState, useEffect, useContext } from 'react'
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import { FaUserCircle } from 'react-icons/fa'
import Card from '../../shared/components/Card'

import './ProductDetails.css'
import Button from '../../shared/components/Button'
import NotifyModal from '../../shared/components/NotifyModal'
import { AuthContext } from '../../shared/components/context/auth-context'

const ProductDetails = (props) => {
    const [current, setCurrent] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [loadedProduct, setLoadedProduct] = useState()
    const [length, setLength] = useState()
    const [descriptionArray, setDescriptionArray] = useState()
    const [availability, setAvailability] = useState()
    const [review, setReview] = useState()
    const [updateReview, setUpdateReview] = useState([])
    const [message, setMessage] = useState()


    const axios = require('axios').default
    const auth = useContext(AuthContext)


    const productId = useParams().pid

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/products/${productId}`)
            .then(function (response) {
                // handle success
                setLength(response.data.product.image.length)
                const descriptionArray = response.data.product.description.split("|")
                setDescriptionArray(descriptionArray)
                setAvailability(response.data.product.availability)
                setUpdateReview(response.data.product.review)
                setLoadedProduct(response.data.product)
                setIsLoading(false)
            })
            .catch(function (error) {
                // handle error
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    }, [productId, axios])

    const clearHandler = () => {
        setError(null)
        setMessage(null)
    }



    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }


    const AddCartHandler = () => {
        setIsLoading(true)
        axios.post(`http://localhost:5000/api/products/cart/${productId}`, {}, {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then((response) => {
                // handle success
                console.log('success')
                setMessage('Successfully Added to the Cart')
                auth.cart(auth.cartLength + 1)
                setIsLoading(false)
                //redirect to Cart Page
            })
            .catch((error) => {
                // handle error
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    }

    const AddOrderHandler = () => {
        setIsLoading(true)
        axios.post(`http://localhost:5000/api/products/order/${productId}`, {}, {
            headers: {
                //Add token from localStorage save in context and then use here
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then((response) => {
                // handle success
                console.log('success')
                setAvailability(response.data.product.availability)
                setMessage('Order Placed Successfully')
                setIsLoading(false)
                //redirect to Order Page
            })
            .catch((error) => {
                // handle error
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    }

    const submitHandler = (e) => {
        setIsLoading(true)
        e.preventDefault()
        axios.post(`http://localhost:5000/api/products/review/${productId}`, {
            comment: review
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then((response) => {
                console.log('success')
                setUpdateReview(response.data.product.review)
                setMessage('Review added Successfully')
                setIsLoading(false)
            })
            .catch((error) => {
                console.log('error')
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })

    }

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearHandler} />
            <NotifyModal message={message} onClear={clearHandler} />
            { !isLoading && loadedProduct &&
                <div className='main'>
                    <div className='product'>
                        <div className='product-image'>
                            {loadedProduct.image.map((slide, index) => {
                                return (
                                    <div >
                                        {index === current && (<img src={slide} alt='image' className='p-image' />)}
                                    </div>
                                )
                            })}
                        </div>
                        <RiArrowDropLeftLine className='left-slider' size={45} onClick={prevSlide} />
                        <RiArrowDropRightLine className='right-slider' size={45} onClick={nextSlide} />

                        <div className='description'>
                            <h2>{loadedProduct.title}</h2>
                            <ul>
                                {descriptionArray.map(description => {
                                    return (
                                        <li className='description-list'>
                                            {description}
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="availabiity">
                                {availability !== 0 ?
                                    (availability > 5 ?
                                        (<h5 className='available'> {availability} items available</h5>) :
                                        <h5 className='less-available'>Hurry up only {availability} left</h5>) :
                                    (<h5 className='less-available'> Out of Stock</h5>)}
                                    <h2>{loadedProduct.price}</h2>
                            </div>
                            <div className='btn'>
                                {availability !== 0 && auth.isLoggedIn ?
                                    (<><Button size='big' buy onClick={AddOrderHandler}>Buy Now</Button>
                                        <Button size='big' cart onClick={AddCartHandler}>Add to Cart</Button></>) :
                                    (<><Button size='big' disabled >Buy Now</Button>
                                        <Button size='big' disabled >Add to Cart</Button></>)}
                            </div>
                        </div>
                    </div>

                    <div className='review'>
                        <h2>Reviews</h2>
                        {updateReview.map((review) => {
                            return (
                                <>
                                    <div className='review-box'>
                                        <div className="icon-name">
                                            <FaUserCircle />
                                            <h4>{review.name}</h4>
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                </>
                            )

                        })}
                        {auth.isLoggedIn && (<div className='review-form'>
                            <Card >
                                <form onSubmit={submitHandler}>
                                    <h2>Add Reviews</h2>
                                    <input className='review-input'
                                        name="review"
                                        type="text"
                                        placeholder=" Add a review..."
                                        onChange={e => setReview(e.target.value)}
                                        required
                                    />
                                    <br></br>
                                    <Button type="submit" className='add-btn'>Add</Button>
                                </form>
                            </Card>
                        </div>)}
                    </div>

                </div >
            }
        </>
    )
}

export default ProductDetails