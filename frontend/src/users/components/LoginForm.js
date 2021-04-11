import { react, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../../shared/components/Card'
import Button from '../../shared/components/Button'
import './LoginForm.css'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import { AuthContext } from '../../shared/components/context/auth-context'
const axios = require('axios')

const Login = () => {
    const history = useHistory()
    const [loginDetails, setLoginDetails] = useState({ emailId: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const auth = useContext(AuthContext)

    const submitHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        console.log(loginDetails)
        axios.post('http://localhost:5000/api/users/login', {
            email: loginDetails.emailId,
            password: loginDetails.password
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
            <ErrorModal error={error} onClear={clearHandler} />
            <div className="authentication">
                <Card className='login-card' >
                    <form onSubmit={submitHandler}>
                        <h2>Login</h2>
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
                        <br></br>
                        <Button type="submit">Login</Button>
                    </form>
                    <p>Not Registered? <a href='/user/signup'>Sign up</a></p>
                </Card>
            </div>
            {isLoading && <LoadingSpinner asOverlay />}
        </>
    )
}
export default Login