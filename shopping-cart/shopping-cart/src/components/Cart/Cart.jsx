import { useState } from "react";

const items = [
  {
    product: 'Product 1',
    quantity: 2,
    price: '$50.00',
    total: '$100.00',
  },
  {
    product: 'Product 2',
    quantity: 1,
    price: '$20.00',
    total: '$20.00',
  },
  {
    product: 'Product 3',
    quantity: -2,
    price: '$30.00',
    total: '$150.00',
  },
];

function RangeInput({ starting=1, min=1, max=100 }) {
  if (starting < min) {
    starting = 1;
  }
  if (starting > max) {
    starting = 100;
  }

  const [value, setValue] = useState(starting);

  function handleDecrement() {
    setValue((prev) => prev - 1);
  }

  function handleIncrement() {
    setValue((prev) => prev + 1);
  }

  function handleInputChange(e) {
    const inputValue = e.target.value;
    if (/^[0-9]+$/.test(inputValue)) {
      const value = parseInt(inputValue);
      if (value < min) {
        setValue(min);
      } else if (value > max) {
        setValue(max);
      } else {
        setValue(value);
      }
    }
    else if (inputValue === '') {
      setValue(min);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button onClick={handleDecrement} className="bg-gray-100 px-2 rounded hover:bg-gray-200 transition duration-300 ease-in-out" disabled={value <= min}>-</button>
        <input type="text" value={value} onChange={handleInputChange} className="border rounded text-center w-12" />
        <button onClick={handleIncrement} className="bg-gray-100 px-2 rounded hover:bg-gray-200 transition duration-300 ease-in-out" disabled={value >= max}>+</button>
      </div>
    </>
  )
}

function Item({productDetails, quantity, price, total}) {
  return (
    <div className="grid grid-cols-subgrid col-span-4 gap-4">
      <div className="">{productDetails}</div>
      <div><RangeInput starting={quantity} /></div>
      <div>{price}</div>
      <div>{total}</div>
    </div>
  )
}

function Cart() {
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

        <div className="font-bold">PRODUCT</div>
        <div className="font-bold">QUANTITY</div>
        <div className="font-bold">PRICE</div>
        <div className="font-bold">TOTAL</div>

        <div className="font-bold">{items.length} Items</div>
        <div className="font-bold">$327.98</div>

        {items.map((item, i) => (
          <Item
            key={i}
            productDetails={item.product}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
          />
        ))}

        <button>Continue Shopping</button>

        <div className="font-bold row-start-4 col-start-5">SHIPPING</div>
        <div className="row-start-5 col-start-5">dropdown menu</div>
        <div className="row-start-6 col-start-5 col-span-2">
          <hr className="border-gray-300"/>
        </div>
        <div className="row-start-7 col-start-5 font-bold">TOTAL COST</div>
        <div className="row-start-7 col-start-6 font-bold">$500.12</div>
        <div className="row-start-8 col-start-5">
          <button>CHECKOUT</button>
        </div>

      </div>

    </>
  )
}

export default Cart;