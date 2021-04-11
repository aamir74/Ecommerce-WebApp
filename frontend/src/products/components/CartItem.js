import { React, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/components/Button'
import Card from '../../shared/components/Card'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import NotifyModal from '../../shared/components/NotifyModal'
import { AuthContext } from '../../shared/components/context/auth-context'


const CartItem = (props) => {

    const axios = require('axios').default
    const auth = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [availability, setAvailability] = useState()
    const [message, setMessage] = useState()


    const addOrderHandler = () => {
        setIsLoading(true)
        axios.post(`http://localhost:5000/api/products/order/${props.id}`, {}, {
            headers: {
                //Add token from localStorage save in context and then use here
                Authorization:'Bearer '+ auth.token
            }
        })
            .then((response) => {
                // handle success
                console.log('success')
                setAvailability(response.data.product.availability)
                setMessage('Order Placed Successfully')
                setIsLoading(false)
            })
            .catch((error) => {
                // handle error
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    }


    const clearHandler = () => {
        setError(null)
        setMessage(null)
    }

    return (
        <>

            <ErrorModal error={error} onClear={clearHandler} />
            <NotifyModal message={message} onClear={clearHandler} />
            <div className='product-card'>
                <Card className='card'>
                    {isLoading ? <LoadingSpinner asOverlay /> :
                        <div className='product-details'>
                            <div className='product-images'>
                                <Link to={`/${props.id}`}>
                                    <img src={props.image[0]} alt='image' className='cart-image' />
                                </Link>
                            </div>
                            <div className='product-description'>
                                <Link to={`/${props.id}`}>
                                    <h3>{props.title}</h3>
                                </Link>
                                <span>{props.description}</span>
                                <h4>₹{props.price}</h4>
                            </div>
                            {props.type !== 'order' && <div className='order-btn'>
                                {props.availability !== 0 && availability !== 0 ?
                                    <Button size='small' buy onClick={addOrderHandler} >Buy Now</Button> :
                                    <Button size='small' disabled >Buy Now</Button>}
                            </div>}
                            {props.type === 'order' && <div className='delivery'>Item will be delivered soon...</div>}
                        </div>
                    }</Card>
            </div>
        </>
    )
}

export default CartItem