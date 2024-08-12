import React, { useContext } from 'react';
import UserContext from '../contexts/Usercontext';
const Check=()=>{
    const { user, logout } = useContext(UserContext);
return (
<>
<h2>Welcome, {user.Usermail}!</h2>
<h1>check also works</h1>
</>
);
}
export default Check;