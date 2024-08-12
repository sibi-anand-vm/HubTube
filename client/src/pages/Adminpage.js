import React, { useState } from "react";
import Adminleft from "../components/Adminleft";
import Adminright from "../components/Adminright";
import '../styles/Adminpage.css'
const Adminpage = () => {
  const [sidebarval, setsidebarval] = useState(1);
  const [usersArray, setUsersArray] = useState([]);
  return (
    <>
    <div className="fulladminpage">
      <Adminleft sidebarval={sidebarval} setsidebarval={setsidebarval}/>
      <Adminright sidebarval={sidebarval} usersArray={usersArray} setUsersArray={setUsersArray} />
      </div>
    </>
  );
};

export default Adminpage;
