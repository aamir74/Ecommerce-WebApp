import React from 'react'
import ReactDOM from 'react-dom'
import './MainHeader.css'

const MainHeader = props => {
    const content = (
        <header className='main-header'>
            {props.children}
        </header>
    )
    return (
        ReactDOM.createPortal(content, document.getElementById('header-hook'))
    )
}

export default MainHeader