import {createContext} from 'react'

export const AuthContext = createContext({
    isLoggedIn:false,
    userId: null,
    token:null,
    cartLength:null,
    cart:()=>{},
    login:()=>{},
    logout:()=>{},
})