import React, { useContext, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthContext/authContext';

const UpdateProfile = () => {

  const {currentUser, updateUserEmail , updateUserPassword} = useContext(authContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const[error , setError] = useState(false)
  const[loading , setLoading] = useState(false)

const handleSubmit = (e)=>{

    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmationRef.current.value ) { return setError('passwords do not match')}

    const promises = [];
    setError(false);
    setLoading(true);

    if(emailRef.current.value !== currentUser.email){
      promises.push(updateUserEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
      promises.push(updateUserPassword(passwordRef.current.value))
    }

    Promise.all(promises)
    .then(()=>{
      navigate('/');
    })
    .catch(()=>{
      setError('failed to update profile')
    })
    .finally(()=>{
        setLoading(false)
    })

}


  return (
    <React.Fragment>
    <div className="card" style={{minWidth:'400px'}}>
        <div className="card-body">
            <h3 className="card-title text-center">Update Profile</h3>

            {error && <Alert variant='danger'> {error} </Alert> }

            <form className='form-group'  onSubmit={handleSubmit}>
            <label htmlFor='email' className='text-start'> E-mail</label>
            <input type='text'  ref = {emailRef} className="form-control mb-3" placeholder="Enter your email" id='email' name='e-mail' defaultValue={currentUser.email} />

            <label htmlFor='password' className='text-start'> Password</label>
            <input type='password' ref = {passwordRef} className="form-control mb-3" placeholder="Enter your password" id='password' name='pass' minLength='8'/>

            <label htmlFor='passwordConformation' className='text-start'> Password Conformation</label>
            <input type='password' ref={passwordConfirmationRef} className="form-control mb-3" placeholder="Enter your password" id='passwordConformation' name='conf-pass'/>

            <button type='submit' className='btn btn-primary form-control' disabled={loading}> Update </button>
            </form>
        </div>
    </div>

    <div className="mt-2">
      <NavLink to='/'> Cancel </NavLink>
    </div>
</React.Fragment>
  )
}

export default UpdateProfile