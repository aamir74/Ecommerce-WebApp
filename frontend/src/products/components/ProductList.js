import React from 'react'
import './ProductList.css'
import ProductItem from './ProductItem'


const ProductList = props =>{
    return(
        <ul className='users-list'>
            {props.items.map(product => {
                return <ProductItem
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.title}
                price={product.price}             
                />
            })}
        </ul>
    )
}

export default ProductList



