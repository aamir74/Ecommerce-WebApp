import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'
import Cart from './Cart'
import { AuthContext } from '../../shared/components/context/auth-context'

const NavLinks = props => {

    const auth = useContext(AuthContext)

    return <ul className='nav-links'>

        <h2><a href='/'>Azon</a></h2>

        <li>
            <NavLink to='/user/order'>Orders</NavLink>
        </li>
        {!auth.isLoggedIn && (
            <li>
                <NavLink to='/user/auth'>Authenticate</NavLink>
            </li>
        )}
        <Cart />
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>
        )}

    </ul>


}

export default NavLinks