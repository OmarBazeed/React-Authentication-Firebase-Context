import './App.css';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import RequiredAuth from './AuthContext/RequiredAuth';


function App() {
  return (
    <div className="container d-flex align-items-center justify-content-center flex-column" style={{minHeight:'100vh'}}>

        <Routes>

            <Route path="/" element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>

    </div>

  );
}

export default App;
