import React,{useContext} from 'react';
import '../styles/Loginpage.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postloginData } from '../services/apiService';
import Navbar1 from '../components/navbar1';
import UserContext from '../contexts/Usercontext';
const Loginpage=()=>{
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const handlelogin=async()=>{
        const Usermail = document.getElementById('Usermail').value;
        const Password = document.getElementById('Password').value;
        if (Usermail === '' || Password === '') {
            toast.warning('Please Enter all Credentials');
            return;
        }
        try {
            await postloginData(
              Usermail,
              Password,
              navigate,
              login
            );
          } catch (error) {
            toast.error(error);
          }
    }
return (
    <>
    <div className='loginpage'>
    <Navbar1 />
    <div className="block22">
                    <h1>Sign In</h1>
                    <form className="signin" >
                        <input className="signininbox" id="Usermail" type="email" placeholder="Email" />
                        <input className="signininbox" id="Password" type="password" placeholder="Password" />
                        <div className="homebtn">
                            <h4>Get back to home</h4>
                            <button onClick={() => navigate('/')}>Click me</button>
                        </div>
                        <button type="button" onClick={()=>handlelogin()} className="regbtn">Dive In</button>
                    </form>
                </div>
                <ToastContainer position="top-right" />
     </div>
    </>
)
}
export default Loginpage;