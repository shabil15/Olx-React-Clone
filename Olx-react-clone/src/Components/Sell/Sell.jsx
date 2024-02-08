import { useContext, useState } from 'react';
import { db, storage } from "../Firebase/Config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../Firebase/context';

function Sell() {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessages, setErrorMessages] = useState({
    productName: '',
    location: '',
    category: '',
    price: '',
    file: '',
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const date = new Date();
  const usersCollectionRef = collection(db, "Products");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createProducts = async () => {
    // Reset error messages
    setErrorMessages({
      productName: '',
      location: '',
      category: '',
      price: '',
      file: '',
    });

    // Validation
    if (!productName.trim()) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, productName: 'Product Name is required.' }));
      return;
    }

    if (productName.split(' ').length > 4) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, productName: 'Product Name can have at most 3 spaces.' }));
      return;
    }

    if (!category.trim()) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, category: 'Category is required.' }));
      return;
    }

    if (/\s/.test(category)) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, category: 'Category should not contain spaces.' }));
      return;
    }

    if (!price.trim()) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, price: 'Price is required.' }));
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, price: 'Price must be a number greater than 0.' }));
      return;
    }

    if (!location.trim()) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, location: 'Location is required.' }));
      return;
    }

    if (/\s/.test(location)) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, location: 'Location should not contain spaces.' }));
      return;
    }

    if (!file) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, file: 'Image is required.' }));
      return;
    }

    try {
      const storageRef = ref(storage, `/images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      await addDoc(usersCollectionRef, {
        productName,
        price: parsedPrice,
        location,
        category,
        url: downloadURL,
        userId: user.uid,
        date: date.toString(),
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <div className='flex justify-center mt-12 '>
        <div className='Main-Content '>
          <p className='text-2xl font-black m-6 ml-8'>Add your Product Details</p>
          <input
            onChange={(event) => setProductName(event.target.value)}
            type='text'
            className='placeSearch-Login mt-6 ml-6 p-2'
            placeholder='Product Name'
          />
          <p className='text-red-500 ml-6'>{errorMessages.productName}</p>
          <input
            onChange={(event) => setCategory(event.target.value)}
            type='text'
            className='placeSearch-Login mt-5 ml-6 p-2'
            placeholder='Category'
          />
          <p className='text-red-500 ml-6'>{errorMessages.category}</p>
          <input
            onChange={(event) => setPrice(event.target.value)}
            type='number'
            className='placeSearch-Login mt-5 ml-6 p-2'
            placeholder='Price'
          />
          <p className='text-red-500 ml-6'>{errorMessages.price}</p>
          <input
            onChange={(event) => setLocation(event.target.value)}
            type='text'
            className='placeSearch-Login mt-5 ml-6 p-2'
            placeholder='Location'
          />
          <p className='text-red-500 ml-6'>{errorMessages.location}</p>
          <input onChange={handleChange} type='file' className='placeSearch-Login mt-5 ml-6 p-2' placeholder='Image' />
          <p className='text-red-500 ml-6'>{errorMessages.file}</p>
          <div className='h-40 mx-10 mt-4 overflow-hidden'>
            <img src={(file) && URL.createObjectURL(file)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='' />
          </div>
          <button
            onClick={createProducts}
            className={`rounded-full text-white bg-teal-700 border-2 h-10 w-64 ml-16 mt-2 hover:border-blue-500`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
