import React, { useContext, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthContext/authContext';
// import swal from 'sweetalert';
import { Alert } from 'react-bootstrap';



const Signup = () => {

    const {signup} = useContext(authContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const navigate = useNavigate();

    const[error , setError] = useState(false)
    const[loading , setLoading] = useState(false)

const handleSubmit = async(e)=>{

    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmationRef.current.value ) { return setError('passwords do not match')}

    try{
        setError(false)
        setLoading(true)
        await signup(emailRef.current.value.toLowerCase(),passwordRef.current.value);
        navigate('/')
    }catch(error){
        setError('failed to create an account')
    }

    setLoading(false)
}

return (
    <React.Fragment>
        <div className="card" style={{minWidth:'400px'}}>
            <div className="card-body">
                <h3 className="card-title text-center">Sign Up</h3>

                {error && <Alert variant='danger'> {error} </Alert> }

                <form className='form-group'  onSubmit={handleSubmit}>
                <label htmlFor='email' className='text-start'> E-mail</label>
                <input type='text'  ref = {emailRef} className="form-control mb-3" placeholder="Enter your email" id='email' name='e-mail' />

                <label htmlFor='password' className='text-start'> Password</label>
                <input type='password' ref = {passwordRef} className="form-control mb-3" placeholder="Enter your password" id='password' name='pass' minLength='8'/>

                <label htmlFor='passwordConformation' className='text-start'> Password Conformation</label>
                <input type='password' ref={passwordConfirmationRef} className="form-control mb-3" placeholder="Enter your password" id='passwordConformation' name='conf-pass'/>

                <button type='submit' className='btn btn-primary form-control' disabled={loading}>Sign up </button>
                </form>
            </div>
        </div>

        <div className="haveAccount mt-2">
        Already have an account ? <NavLink to='/login'> Log in </NavLink>
        </div>
    </React.Fragment>
)
}

export default Signup;