import React from 'react'
import { Link } from 'react-router-dom'

import './ProductsItem.css'

const ProductsItem = props => {
    return (
        <Link to={`/${props.id}`} exact>
        <div className="bg">
            <li className="product-item">
                <img src={props.image[0]} alt={props.title} />
                <h4>{props.title}</h4>
                <h5>₹{props.price}</h5>
            </li>
        </div>
        </Link>
    )
}

export default ProductsItem