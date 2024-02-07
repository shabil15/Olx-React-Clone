import React,{useState} from 'react'
import './Auth.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import {auth} from '../Firebase/Config';
import { db } from "../Firebase/Config";
import {collection,addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Auth() {
  const [isLogin,setIsLogin] = useState(true)
  const [newName,setName] = useState("")
  const [newMobile,setMobile] = useState("");
  const [newEmail,setEmail] = useState("");
  const [newPassword,setPassword] = useState("");

  const [email,setEmailLogin] = useState("");
  const [password,setPasswordLogin] =useState('')

  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const usersCollectionRef = collection(db,'Users');

  const handleToggleForm = () => {
    setIsLogin((prevIsLogin)=> !prevIsLogin )
  }

 
  const validateInput = () => {
    let valid = true;

    // Validate name
    if (!newName.trim()) {
      setNameError('Name cannot be empty');
      valid = false;  
    } else if (/\s{2,}/.test(newName)) {
      setNameError('Name cannot have more than one space between words');
      valid = false;
    } else {
      setNameError('');
    }

    // Validate mobile
    if (!newMobile.trim() || !/^\d{10}$/.test(newMobile) || /^(.)\1+$/.test(newMobile) || /^[0-5]/.test(newMobile)) {
        setMobileError('Please enter a valid 10-digit mobile number');
        valid = false;
      } else {
        setMobileError('');
      }
      

    // Validate email
    if (!newEmail.trim() || !/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!newPassword.trim() || !/^.*[!@#$%^&*]+.*$/.test(newPassword) || newPassword.length < 6) {
        setPasswordError('Password must contain at least 6 with one special character')
        valid = false;
      } else {
        setPasswordError('');
      }
  
      return valid;
    };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    await createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: newName }).then(() => {
          addDoc(usersCollectionRef, { name: newName, mobile: Number(newMobile), userUid: user.uid }).then(() => {
            setIsLogin(false);
            navigate("/");
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onLogin =(e) =>{
    e.preventDefault();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      navigate('/');
      console.log(user);
    }).catch((error)=>{
      console.log(error);
      window.alert(error.message)
    })
  }


  return (
    <div className='flex justify-center mt-14'>
      <div className="Main-Content grid grid-cols-1">
        <div className='h-full flex justify-center items-center'>
          <img className='h-20' src="\public\OLX-Symbol.png" alt="" />
        </div>
        <div className='h-full '>
          {!isLogin ? (
            <>
              <input
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError('');
                }}
                type="text"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Name'
              />
              <div className='text-red-500 ml-6'>{nameError}</div>

              <input
                onChange={(event) => {
                  setMobile(event.target.value);
                  setMobileError('');
                }}
                type="text"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Mobile'
              />
              <div className='text-red-500 ml-6'>{mobileError}</div>

              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError('');
                }}
                type="email"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Email'
              />
              <div className='text-red-500 ml-6'>{emailError}</div>

              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError('');
                }}
                type="password"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Password'
              />
              <div className='text-red-500 ml-6'>{passwordError}</div>
            </>
          ) : (
            <>
              <input
                onChange={(event) => {
                  setEmailLogin(event.target.value);
                  setEmailError('');
                }}
                type="email"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Email'
              />
              <div className='text-red-500'></div>

              <input
                onChange={(event) => {
                  setPasswordLogin(event.target.value);
                  setPasswordError('');
                }}
                type="password"
                className="placeSearch-Login mt-5 ml-6 p-2"
                placeholder='Password'
              />
              <div className='text-red-500'></div>
            </>
          )}
        </div>
        <div className='h-full font-bold from-neutral-600 grid justify-center items-start'>
          {isLogin ? (
            <button
              onClick={onLogin}
              className={`rounded-full text-white bg-teal-700 border-2 h-10 w-64 hover:border-blue-500`}
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`rounded-full bg-teal-700 text-white border-2 h-10 w-64 hover:border-blue-500`}
            >
              Signup
            </button>
          )}
          <div
            className='flex justify-center hover:cursor-pointer'
            onClick={handleToggleForm}
          >
            {isLogin ? 'Create New Account' : 'Already have an account? Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth