import React from 'react'
import CartItem from './CartItem'



const CartList = props => {

    console.log(props.items)
    return (
        <>
            <div className='product-list'>
            <h2>My {props.type}</h2>
                {props.items.map(product => {
                    return (
                        <CartItem
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            description={product.description}
                            name={product.title}
                            price={product.price}
                            availability={product.availability}
                            type={props.type}
                        />
                    )

                })}
            </div>
        </>
    )
}

export default CartList