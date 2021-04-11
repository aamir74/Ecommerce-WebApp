import React, { useState } from 'react'
import './ProductsList.css'
import ProductsItem from './ProductsItem'
import Card from '../../shared/components/Card'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'



const ProductsList = props => {
    const [startList, setStartList] = useState(0)
    const [endList, setEndList] = useState(7)
    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>Products Not Found.</h2>
                </Card>
            </div>
        )
    }

    const leftHandler = () => {
        const start = startList === 0 ? 0 : startList - 2
        setStartList(start)
        setEndList(start + 7)
    }

    const rightHandler = () => {
        const end = endList >= props.items.length ? 7 : endList + 2
        setEndList(end)
        setStartList(end - 7)
    }

    const showItems = props.items.slice(startList, endList)
    console.log(startList)
    console.log(endList)

    return (
        <>
            <div className="list-container">
                <h2>Deals of the Day</h2>
                <FaArrowAltCircleLeft className="left-arrow-list" onClick={leftHandler} />
                <FaArrowAltCircleRight className="right-arrow-list" onClick={rightHandler} />

                <ul className='products-list'>


                    {showItems.map(product => {
                        return <ProductsItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}

                        />
                    })}
                </ul>
            </div>
        </>
    )
}

export default ProductsList



