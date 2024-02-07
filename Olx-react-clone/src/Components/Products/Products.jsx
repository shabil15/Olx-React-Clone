import { useNavigate } from "react-router-dom";
import "./products.css";
import { faRegHeart } from "react-icons/fa";
import { db } from "../Firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";

function Products() {
  const { setPostDetails } = useContext(PostContext);
  const productCollectionRef = collection(db, "Products");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log("Error fetching data :", error);
      }
    };

    fetchData();
  }, [third]);

  function goToProductDetails(obj) {
    setPostDetails(obj);
    navigate("/ProductDetails");
  }

  function formateDate(dateString) {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <>
      <div className="h-40"></div>
      <h1 className="absolute ml-36 text-2xl font-normal titel-text">
        Fresh recommendations
      </h1>
      <div className="flex-container mt-9 flex flex-wrap">
        {products.map((obj, index) => (
          <div
            onClick={() => goToProductDetails(obj)}
            key={index}
            className="wrapper"
          >
            <div className="card max-w-xs mx-2 mb-4">
              <div className="card-image-container flex items-start justify-end">
                <div className="bg bg-white h-10 w-10 absolute rounded-full m-1 p-2">
                  <FaRegHeart size={24} />
                </div>
                <img className="max-w-full" src={obj.url} alt="" />
              </div>
              <p className="card-title">₹ {obj.price}</p>
              <p className="card-des font-medium	">{obj.productName}</p>
              <div className="flex justify-between">
                <p className="card-des">{obj.location}</p>
                <p className="card-des">{formatDate(obj.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
