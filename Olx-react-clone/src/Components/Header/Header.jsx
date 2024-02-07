import React from 'react'
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

function Header() {
  return (
    <div className='headerParentDiv px-32'>
      <div className='headerChildDiv'>
        <div className='brandName'>
        <img style={{width:'50px',height:'30px'}} src="\public\OLX-Symbol.png" alt="olx-logo" />
        </div> 
        <div className='searchPlace'>
        <IoIosSearch size={20} />
         <input type="text" />  
         <IoIosArrowDown size={30} />
        </div> 
        <div className='searchProduct'>
         <div className='input'>
          <input type="text" placeholder='Find Cars, Mobile Phones and more...' />
         </div>
         <div className='searchAction'>
         <IoSearch color='white' size={25} />
         </div>
        </div>
        <div className='language'>
          <span>ENGLISH</span>
          <IoIosArrowDown size={30} />
        </div>
        <div className='loginPage' >

        </div>
        {/* <Link>
        <button>
          <FaPlus className = 'mr-1'/>SELL
        </button>
        </Link> */}
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
  )
}

export default Header