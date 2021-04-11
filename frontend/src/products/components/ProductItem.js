import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../shared/components/Avatar'
import Card from '../../shared/components/Card'
import './ProductItem.css'

const ProductItem = props => {
    return (

        // <Card className='user-item'>
        //     <Link to={`/${props.id}`}>
        //         <div className='user-item__image'>
        //             <Avatar image={props.image[0]} alt={props.name} />
        //         </div>
        //         <div className='user-item__info'>
        //             <h2>{props.name}</h2>
        //             <h3> ₹ {props.price}</h3>
        //         </div>
        //     </Link>
        // </Card>
        <div className='user-item'>
            <Link to={`/${props.id}`}>
                <div className='user-item__image'>
                    <Avatar image={props.image[0]} alt={props.name} />
                </div>
                <div className='user-item__info'>
                    <h2>{props.name}</h2>
                    <h3> ₹ {props.price}</h3>
                </div>
            </Link>
        </div>
    )
}

export default ProductItem