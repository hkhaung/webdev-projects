// is the "home page"
// search bar to search for products
// card display to show products

import Navbar from "../Navbar/Navbar.jsx";
import {useEffect, useState} from "react";

function Search({ originalProducts=[], products=[], setQueryArr } ) {
  function handleQuery(e) {
    const query = e.target.value.trim();
    // setSearchQuery(query);

    if (query === "") {
      setQueryArr(originalProducts);
      setNumProducts(originalProducts.length);
      return;
    }

    const filteredProductsArr = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setQueryArr(filteredProductsArr);
    setNumProducts(filteredProductsArr.length);
  }

  // const [searchQuery, setSearchQuery] = useState("");
  const [numProducts, setNumProducts] = useState(originalProducts.length);

  return (
    <>
      <div className="searchbar-container">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-x-8 md:gay-y-2">
          <div
            className="flex items-center min-w-[20rem] text-2xl">Search results {numProducts > 0 ? `(${numProducts})` : ''}</div>
          <form className="w-full sm:col-span-2 md:col-span-2">
            <input
              type="text"
              placeholder="Search for items in store here..."
              className="w-full p-2 border border-gray-300 rounded-md text-slate-700 placeholder:text-slate-400 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              onChange={handleQuery}
            />
          </form>
        </div>
      </div>
    </>
  )
}

function Card({ itemID="", imgSrc="", title = "Title", description = "description", category = "category", price=99.99 }) {
  function handleAddToCart() {
    if (!itemID) {
      return;
    }

    const count = localStorage.getItem(itemID);
    if (count === null) {
      localStorage.setItem(itemID, 1);
    } else {
      localStorage.setItem(itemID, (parseInt(count) + 1).toString());
    }
  }

  function handleRemoveFromCart() {
    if (!itemID) {
      return;
    }

    let count = localStorage.getItem(itemID);
    count = parseInt(count);
    if (count && count > 0) {
      localStorage.setItem(itemID, (count - 1).toString());
    } else if (count === 0) {
      localStorage.removeItem(itemID);
    }
  }

  return (
    <>
      <div
          className="card-container border rounded-lg shadow-md pb-8 w-full max-w-[20rem] group/default hover:bg-slate-100">
        <div className="group-hover/default:hidden">
          <img src={imgSrc} alt={`${title} image`}
               className="w-full min-h-[13.5rem] max-h-[13.5rem] object-contain mt-4"/>
          <div className="info mt-5 px-4 min-h-[12rem] max-h-[12rem]">
            <div className="title font-medium text-xl line-clamp-2 break-words">{title}</div>
            <div className="description mt-1 text-gray-600 line-clamp-5 break-words">{description}</div>
          </div>
          <div className="category-price-container flex justify-between px-4 mt-2 text-sm text-gray-600">
            <div className="category italic">{category}</div>
            <div className="price text-base font-bold">${price}</div>
          </div>
        </div>

        <div className="transition-opacity duration-300 ease-in opacity-0 group-hover/default:opacity-100">
          <div
            className="hidden group-hover/default:flex items-center justify-center h-full min-h-[26.5rem] md:min-h-[24.5rem]">
          <div className="flex flex-col items-center justify-center space-y-4">
              <button className="add-to-cart-btn w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out" onClick={handleAddToCart}>Add to cart</button>
              <button className="remove-from-cart-btn w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out" onClick={handleRemoveFromCart}>Remove from cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CardsDisplay({ products=[] }) {
  return (
      <>
        <div className="display-container mt-8">
          <div className="cards-container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} itemID={product.id} imgSrc={product.image} title={product.title} description={product.description} category={product.category} price={product.price} />
            ))}
        </div>
      </div>
    </>
  )
}


function SearchAndDisplay() {
  const [productsArr, setProductsArr] = useState([]);
  const [queryArr, setQueryArr] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProductsArr(data);
        setQueryArr(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-1 p-8 lg:p-20">
          <Search products={queryArr} setQueryArr={setQueryArr} originalProducts={productsArr} />
          <CardsDisplay products={queryArr} />
        </div>
      </div>
    </>
  )
}

export default SearchAndDisplay;