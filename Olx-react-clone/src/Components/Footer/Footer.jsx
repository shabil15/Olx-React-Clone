import './Footer.css';
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { MdOutlinePlayCircleOutline } from "react-icons/md";


function Footer() {
  return (
    <div className='container'>
        <div className="footerParentDiv ">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>TRENDING LOCATION</p>
          </div>
          <div className="list">
            <ul>
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list mb-20">
            <ul>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Vulnerability Disclosure Program</li>
            </ul>
          </div>
        </div>
         <div>
          <div className="heading">
            <p>FOLLOW US</p>
          </div>
          <div className="icones flex">
            <div className="icone"><FaFacebookF size={20}/></div>
            <div className="icone"><IoLogoInstagram size={23}/></div>
            <div className="icone"><FaTwitter size={23}/></div>
            <div className="icone"><MdOutlinePlayCircleOutline size={23}/></div>
          </div>
          <div className='flex mt-12'>
            <div>
            <img  src="/Images/playstore.webp" alt="" />
            </div>
            <div>
            <img src="/Images/appstore.webp" alt="" />
            </div>
          </div>
        </div>
        
      </div>
      <div className="footer h-16 ">
        <p className='text-xs'>Help - Sitemap</p>
        <p className='text-xs'>All rights reserved © 2006-2024 OLX</p>
      </div>
    </div>
    </div>
  );
}

export default Footer;