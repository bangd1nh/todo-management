import React, { useState } from 'react'
import { loginAPICALL, saveLoggedInUser, storeToke } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLoginForm(params) {
        params.preventDefault()

        await loginAPICALL(username, password).then(response => {
            console.log(response.data);

            const token = 'Basic ' + window.btoa(username + ":" + password)
            storeToke(token)
            saveLoggedInUser(username)

            navigate('/todos')

            window.location.reload(false)
        }).catch(error => {
            console.error(error);

        })
    }

    return (
        <div className='container'>
            <br></br>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> Login Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Username or Email</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter username or Email'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>password</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-outline-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent