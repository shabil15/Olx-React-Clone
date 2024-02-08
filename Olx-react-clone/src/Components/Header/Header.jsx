
import './Header.css';
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Firebase/context';
import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Config';


function Header() {

    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [logout, setLogout] = useState(false)


    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null)
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.error("not sign out")
        });
    }

    const showLogout = () => {
        setLogout(!logout)
    }

    return (
        <div className="headerParentDiv ">
            <div className="headerChildDiv ">
                <div className="brandName">
                    <img style={{ width: '50px', height: '30px' }} src="\public\OLX-Symbol.png" alt="" />
                </div>
                <div className="placeSearch">
                    <IoIosSearch size={20} />
                    <input type="text" />
                    <IoIosArrowDown size={30} />
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Find Cars, Mobile Phones and more..."
                        />
                    </div>
                    <div className="searchAction">
                        <IoSearch color='white' size={25} />
                    </div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    <IoIosArrowDown size={30} />
                </div>
                <div className="loginPage">
                    {user ?
                        <>
                            <div onClick={showLogout} className='hover:cursor-pointer'>{`${user.displayName}`}</div>
                            {(logout && <div onClick={handleLogout} className='absolute mt-2 h-8 w-16 text-center pt-1 text-white hover:cursor-pointer hover:text-red-600 rounded font-semibold bg-teal-950'>Logout</div>
                            )}
                        </>
                        : <Link to="/Login" className='text-base font-medium hover:cursor-pointer'>
                            Login
                        </Link>
                    }

                    <hr />
                </div>

                <Link to={'/Sell'}>
                    <button className='nav-text px-6 py-1 bg-white rounded-3xl sell-button flex items-center'>
                        <FaPlus className='mr-1' />SELL</button>
                </Link>
            </div>
            <div className="w-full shadow-md pb-2 mt-0">
                <div className='h-12 mx-auto flex items-end justify-around text-[#002f34]'>
                    <div className='nav-lite font-semibold'>ALL CATEGORIES</div>
                    <div className='nav-lite'>Cars</div>
                    <div className='nav-lite'>Motorcycles</div>
                    <div className='nav-lite'>Mobile Phones</div>
                    <div className='nav-lite'>For Sale: Houses & Apartments</div>
                    <div className='nav-lite'>Scooters</div>
                    <div className='nav-lite'>Commercial & Other Vehicles</div>
                    <div className='nav-lite'>For Rent: Houses & Apartments</div>
                </div>
            </div>
        </div>

    );
}


export default Header;