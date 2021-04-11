import { React, useState } from 'react'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import './MainNavigation.css'
import SideDrawer from './SideDrawer'
import Backdrop from '../../shared/components/Backdrop'


const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }
    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav"></nav>
                <NavLinks />
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button >
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
            

        </>
    )
}

export default MainNavigation