import { React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri'
import { AuthContext } from '../../shared/components/context/auth-context'

import './Cart.css'

const Cart = props => {

    const auth = useContext(AuthContext)

    return (
        <>
        <Link className="link" to='/user/cart' exact>
            <div className="cart">
                <RiShoppingCartLine size={24} />
                {auth.isLoggedIn ? <h6>{auth.cartLength}</h6>:<h6>0</h6>}
                <h5>Cart</h5>
            </div>
        </Link>
        </>
    )
}
export default Cart