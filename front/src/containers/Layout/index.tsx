import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import Navbar from '../Navbar'
import SideBar from '../Sidebar'

import './styles.css'

const index = ({children}:{children:ReactNode}) => {

  return (
    <>
      <SideBar />
      <div className="right">
        <Navbar />
        {/* <div className="ghost"></div> */}
        <main>
          {children}
        </main>
      </div>
    </>
  );
}

export default index;