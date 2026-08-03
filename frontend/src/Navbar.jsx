import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import { Menu, X } from "lucide-react";
import { toast } from 'react-toastify';
const Navbar = () => {
   const [login,setlogin]=useState(false);
    const { logout, isLoggedIn } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
  return (
    <div className='text-white bg-[radial-gradient(circle_at_top,#1b1f3a,#06070f)]  h-[70px]'>
  <div className='flex h-[70px] justify-between  px-10 items-center text-[18px] font-bold pointer-coarse: '>
           <div>
                 <Link to='/'>Home</Link>
              </div>
               {/* <div className='flex gap-4'>
                  
                  {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
           <div className='flex gap-3 sm:text-base '><Link to='/register'>Register</Link>
          <Link to="/login">Login</Link></div>
        </>
      )}
                 <Link to='/about'>How it works</Link>
              </div> */}
              <div className="flex items-center gap-4">

  {/* Desktop Links */}
  <div className="hidden sm:flex gap-4 items-center">
    {isLoggedIn ? (
       <button  onClick={logout}><span  className='cursor-pointer '>Logout</span></button>
    ) : (
      <>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </>
    )}

    <Link to="/about">How it works</Link>
  </div>


  {/* Mobile Menu Icon */}
  <button 
    className="sm:hidden"
    onClick={() => setOpen(!open)}
  >
    {open ? <X size={24}/> : <Menu size={24}/>}
  </button>


  {/* Mobile Menu */}
  {open && (
    <div className="absolute cursor-pointer right-4 top-16 flex flex-col gap-3 bg-white text-black p-4 rounded-lg shadow-md sm:hidden">

      {isLoggedIn ? (
         <button  onClick={logout}><span  className='cursor-pointer hover:text-red-500'>Logout</span></button>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      <Link to="/about">How it works</Link>

    </div>
  )}

</div>
             </div>
    </div>
  )
}

export default Navbar