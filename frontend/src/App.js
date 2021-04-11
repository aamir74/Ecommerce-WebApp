import React, { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from './products/components/MainNavigation'
import Product from './products/pages/Product'
import Home from './products/pages/Home'
import ProductsCart from './products/pages/ProductsCart'
import ProductsOrder from './products/pages/ProductsOrder'
import Auth from './users/pages/Auth'
import { AuthContext } from './shared/components/context/auth-context'
import Signup from './users/components/Signup'

let logoutTimer;

const App = () => {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(false)
  const [tokenExpirationTime, setTokenExpirationTime] = useState()
  const [cartLength, setCartlength] = useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 2)
    setTokenExpirationTime(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate }))
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  const cart = useCallback((cartLength) => {
    setCartlength(cartLength)
  })

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime = tokenExpirationTime.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, token, tokenExpirationTime])



  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/:pid' exact>
          <Product />
        </Route>
        <Route path='/user/cart' exact>
          <ProductsCart />
        </Route>
        <Route path='/user/order' exact>
          <ProductsOrder />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/user/login' exact>
          <Auth />
        </Route>
        <Route path='/user/signup' exact>
          <Signup />
        </Route>
        <Route path='/:pid' exact>
          <Product />
        </Route>
        <Redirect to='/user/login' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        cartLength: cartLength,
        cart: cart,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <main>{routes}</main>
      </Router>
    </ AuthContext.Provider>
  )
}

export default App
