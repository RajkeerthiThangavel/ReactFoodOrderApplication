import React, {
       useContext
   } from 'react';
import  "./MainHeader.css";
import foodLogo from './assets/images/foodLogo.jpg'
import AuthContext from '../../store/auth-context';
const MainHeader = () =>{
       const authCtx = useContext(AuthContext);
       
       const logoutHandler = () =>{
              authCtx.onLogout();
       };


       return(<div className="MainHeader"><span><img src={foodLogo} alt="foodLogo" className="appLogo"></img></span>
       <span className="HeaderText">React Food Application</span>
       <span className="logoutWrapper"><button onClick ={logoutHandler} className="logoutBtn">Logout</button></span>
       </div>);
};

export default MainHeader;