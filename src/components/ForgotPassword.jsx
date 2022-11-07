import React, { useContext, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../AuthContext/authContext';

const ForgotPassword = () => {

  const {resetPassword} = useContext(authContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const mailRef = useRef();

  
    const handleReset = async(e)=>{
  
      e.preventDefault();
  
      try{
  
      setError(false);
      setLoading(true)
      await resetPassword(mailRef.current.value);
      setMessage('Check out Your Inbox To Reset Password')
      }catch(error){
        setError('failed to Reset Password')
      }
  
      setLoading(false)
    }


  return (
    <React.Fragment>
      <div className="card" style={{minWidth:'400px'}}>
          <div className="card-body">
              <h3 className="card-title text-center">Reset Password</h3>

              {error && <Alert variant='danger'>{error}</Alert>}
              {message && <Alert variant='success'>{message}</Alert>}

              <form className='form-group' onSubmit={handleReset}>
              <label htmlFor='email' className='text-start'> E-mail</label>
              <input type='text' ref={mailRef} className="form-control mb-3" placeholder="Enter your email" id='email' name='e-mail'/>

              <button type='submit' className='btn btn-primary form-control' disabled={loading}> Reset Password </button>
              </form>
          </div>
          
          <div className='my-3 text-center' >
          <Link to="/login" > login </Link>
          </div>
      </div>

      <div className="haveAccount mt-2">
      Need an account ? <NavLink to='/signup'> Sign up </NavLink>
      </div>
</React.Fragment>
  )
}

export default ForgotPassword