import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function RangeInput({ starting=1, min=1, max=100, itemID=null }) {
  if (itemID === null) {
    return;
  }

  if (starting < min) {
    starting = 1;
  }
  if (starting > max) {
    starting = 100;
  }

  const [value, setValue] = useState(starting);

  function handleDecrement() {
    setValue((prev) => {
      const newValue = prev - 1;
      let obj = JSON.parse(localStorage.getItem(itemID));
      if (obj) {
        obj.count = newValue;
        localStorage.setItem(itemID, JSON.stringify(obj));
      }
      return newValue;
    });
  }

  function handleIncrement() {
    setValue((prev) => {
      const newValue = prev + 1;
      let obj = JSON.parse(localStorage.getItem(itemID));
      if (obj) {
        obj.count = newValue;
        localStorage.setItem(itemID, JSON.stringify(obj));
      }
      return newValue;
    });
  }

  function handleInputChange(e) {
    const inputValue = e.target.value;
    let newValue;

    if (/^[0-9]+$/.test(inputValue)) {
      const value = parseInt(inputValue);
      if (value < min) {
        newValue = min;
        setValue(min);
      } else if (value > max) {
        newValue = max;
        setValue(max);
      } else {
        newValue = value;
        setValue(value);
      }
    }
    else if (inputValue === '') {
      newValue = min;
      setValue(min);
    }

    let obj = JSON.parse(localStorage.getItem(itemID));
    if (obj) {
      obj.count = newValue;
      localStorage.setItem(itemID, JSON.stringify(obj));
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button onClick={handleDecrement} className="bg-gray-100 px-2 rounded hover:bg-gray-200 transition duration-300 ease-in-out" disabled={value <= min}>-</button>
        <input type="text" value={value} onChange={handleInputChange} className="border rounded text-center w-12" />
        <button onClick={handleIncrement} className="bg-gray-200 px-2 rounded hover:bg-gray-200 transition duration-300 ease-in-out" disabled={value >= max}>+</button>
      </div>
    </>
  )
}

function Item({ itemID=null, productDetails=null, quantity=null, price=null, total=null }) {
  return (
    <div className="grid grid-cols-subgrid col-span-4 gap-4">
      <div className="">{productDetails}</div>
      <div><RangeInput itemID={itemID} starting={quantity} /></div>
      <div>${Number(price).toFixed(2)}</div>
      <div>{total}</div>
    </div>
  )
}

function Cart() {
  function handleSelect(e) {
    let cost = totalCost;
    const selectedValue = e.target.value;

    if (selectedValue === "standard") {
      cost += 5;
    } else {
      cost += 15;
    }
    setFinalTotalCost("$" + cost.toFixed(2));
  }

  const [totalCost , setTotalCost] = useState(0);
  const [finalTotalCost, setFinalTotalCost] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    let newItems = [];
    let calculatedTotalCost = 0;

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
      let itemTotal = value.count * value.price;
      newItems.push({itemID: key, product: value.title, quantity: value.count, price: value.price, total: `$${itemTotal.toFixed(2)}`});
      calculatedTotalCost += itemTotal;
    }

    setItems(newItems);
    setTotalCost(calculatedTotalCost);
    calculatedTotalCost += 5;  // by default should be 5 due to shipping fee
    setFinalTotalCost(`$${calculatedTotalCost.toFixed(2)}`);
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-12">
        <div className="col-span-3 col-start-1 font-bold">
          <div className="font-bold">Shopping Cart</div>
        </div>
        <div className="font-bold">{items.length} Items</div>

        <div className="col-span-2">
          <div className="font-bold">Order Summary</div>
        </div>

        <div className="col-span-4">
          <hr className="border-gray-300"/>
        </div>
        <div className="col-span-2">
          <hr className="border-gray-300"/>
        </div>

        <div className="font-bold text-gray-400">PRODUCT</div>
        <div className="font-bold text-gray-400">QUANTITY</div>
        <div className="font-bold text-gray-400">PRICE</div>
        <div className="font-bold text-gray-400">TOTAL</div>

        <div className="font-bold">{items.length} Items</div>
        <div className="font-bold text-right">${totalCost.toFixed(2)}</div>

        {items.map((item, i) => (
          <Item
            key={i}
            itemID={item.itemID}
            productDetails={item.product}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
          />
        ))}

        <div className="font-bold row-start-4 col-start-5">SHIPPING</div>
        <div className="row-start-5 col-start-5 col-span-2 flex justify-center">
          <select name="shipping" id="shipping-dropdown" defaultValue="standard" onChange={handleSelect} className="w-full text-center bg-gray-100 p-2 rounded cursor-pointer focus:outline-none focus:ring-2 focus:border-blue-500 hover:bg-gray-200 transition duration-300 ease-in-out">
            <option value="standard">Standard shipping (+$5.00)</option>
            <option value="same-day">Same day shipping (+$15.00)</option>
          </select>
        </div>
        <div className="row-start-6 col-start-5 col-span-2">
          <hr className="border-gray-300"/>
        </div>
        <div className="row-start-7 col-start-5 font-bold">TOTAL COST</div>
        <div className="row-start-7 col-start-6 font-bold text-right">{finalTotalCost}</div>
        <div className="row-start-8 col-start-5 col-span-2 flex justify-center">
          <button className="w-full bg-blue-500 rounded p-4 font-bold text-white shadow-blue-400 shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">CHECKOUT</button>
        </div>

      </div>

      <Link to="/" className="font-bold text-blue-500">
        <div className="flex items-center gap-2 px-12 hover:text-blue-600 transition duration-300 ease-in-out">
          <svg fill="currentColor" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <polygon
            points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon> </g></svg>
        <span>Continue Shopping</span>
        </div>
      </Link>


    </>
  )
}

export default Cart;