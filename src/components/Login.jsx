import React, { useContext, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../AuthContext/authContext'

const Login = () => {

const {login} = useContext(authContext);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const mailRef = useRef();
const passwordRef = useRef();
const navigate = useNavigate();
const location = useLocation();
const redirectPath = location.state?.path || '/' ;

  const handleLogin = async(e)=>{

    e.preventDefault();

    try{

    setError(false);
    setLoading(true)
    await login(mailRef.current.value , passwordRef.current.value);
    navigate(redirectPath , {replace:true} )

    }catch(error){
      setError('failed to Log In')
    }

    setLoading(false)
  }


  return (
    <React.Fragment>
    <div className="card" style={{minWidth:'400px'}}>
        <div className="card-body">
            <h3 className="card-title text-center">Login</h3>

            {error && <Alert variant='danger'>{error}</Alert>}

            <form className='form-group' onSubmit={handleLogin}>
            <label htmlFor='email' className='text-start'> E-mail</label>
            <input ref={mailRef} type='text'  className="form-control mb-3" placeholder="Enter your email" id='email' name='e-mail'/>

            <label htmlFor='password' className='text-start'> Password</label>
            <input ref={passwordRef} type='password' className="form-control mb-3" placeholder="Enter your password" id='password' name='pass'/>

            <button type='submit' className='btn btn-primary form-control' disabled={loading}>Login </button>
            </form>

            <div className='text-center mt-3'>
            <NavLink to='/forgot-password'> Forgot Password</NavLink>
            </div>
    
        </div>
    </div>

    <div className="haveAccount mt-2">
    Need an account ? <NavLink to='/signup'> signup</NavLink>
    </div>
</React.Fragment>
  )
}

export default Login