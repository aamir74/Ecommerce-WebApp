import { react, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../../shared/components/Card'
import Button from '../../shared/components/Button'
import './Signup.css'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import { AuthContext } from '../../shared/components/context/auth-context'
import MainNavigation from '../../products/components/MainNavigation'
const axios = require('axios')

const Signup = () => {
    const history = useHistory()
    const [loginDetails, setLoginDetails] = useState({ name: "", emailId: "", password: "", address: "", phone_no: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const auth = useContext(AuthContext)

    const submitHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        console.log(loginDetails)
        axios.post('http://localhost:5000/api/users/signup', {
            name: loginDetails.name,
            email: loginDetails.emailId,
            password: loginDetails.password,
            address: loginDetails.address,
            phone_no: loginDetails.phone_no
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(function (response) {
                //handle response
                console.log('success')
                console.log(response.data)
                auth.login(response.data.userId, response.data.token)
                //history.push('/')
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error.response.data.error) //For exact message use error.response.data.error
                setError(error.response ? error.response.data.error : 'Something went wrong, Pls try again')
                setIsLoading(false)
            })
    }

    const clearHandler = () => {
        setError(null)
    }


    return (
        <>
        <MainNavigation />
            <ErrorModal error={error} onClear={clearHandler} />
            <div className="authentication">
                <Card className='signup-card' >
                    <form onSubmit={submitHandler}>
                        <h2>SignUp</h2>
                        <h4>Name</h4>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter Name"
                            onChange={e => setLoginDetails({ ...loginDetails, name: e.target.value })}
                            value={loginDetails.name}
                            required
                        />
                        <h4>Email Id</h4>
                        <input
                            name="emailId"
                            type="text"
                            placeholder="Enter Email ID"
                            onChange={e => setLoginDetails({ ...loginDetails, emailId: e.target.value })}
                            value={loginDetails.emailId}
                            required
                        />
                        <h4>Password</h4>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })}
                            value={loginDetails.password}
                            required
                        />
                        <h4>Address</h4>
                        <input
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                            onChange={e => setLoginDetails({ ...loginDetails, address: e.target.value })}
                            value={loginDetails.address}
                            required
                        />
                        <h4>Contact No.</h4>
                        <input
                            name="contact"
                            type="text"
                            placeholder="Enter Phone Number"
                            onChange={e => setLoginDetails({ ...loginDetails, phone_no: e.target.value })}
                            value={loginDetails.phone_no}
                            required
                        />
                        <br></br>
                        <Button type="submit" >Signup</Button>
                    </form>
                    <p>Already registered <a href='/user/login'>Login</a></p>
                </Card>
            </div>
            {isLoading && <LoadingSpinner asOverlay />}
        </>
    )
}
export default Signup