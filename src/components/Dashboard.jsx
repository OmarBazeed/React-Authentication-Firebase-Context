import React, { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authContext } from '../AuthContext/authContext';


const Dashboard = () => {

const {currentUser} = useContext(authContext);
const [error , setError] = useState(false) ;
const {logout} = useContext(authContext);

const handleClick = async ()=>{

  try{
    await logout();
  }catch(error){
    setError('failed to log out')
  }

}

  return (
    <React.Fragment>
        <div className="card" style={{minWidth:'400px'}}>
          <div className="card-body">
              <h3 className="card-title text-center"> Profile </h3>
              
              {error && <Alert variant='danger'>{error}</Alert>}

              <strong> E-Mail : </strong>  {currentUser && currentUser.email}

              <Link to='/update-profile' className='btn btn-primary d-block my-3'> Update Profile</Link>

          </div>
      </div>

      <Link to='/login' className='btn btn-primary d-block mt-3' onClick={handleClick}> Log Out</Link>

    </React.Fragment>
  )
}

export default Dashboard