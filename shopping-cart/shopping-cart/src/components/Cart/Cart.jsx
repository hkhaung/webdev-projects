

const items = [
  {
    productDetails: 'Product 1',
    quantity: 2,
    price: '$50.00',
    total: '$100.00',
  },
  {
    productDetails: 'Product 2',
    quantity: 1,
    price: '$20.00',
    total: '$20.00',
  },
  {
    productDetails: 'Product 3',
    quantity: 5,
    price: '$30.00',
    total: '$150.00',
  },
];

function Item({ productDetails, quantity, price, total }) {
  return (
    <div className="grid grid-cols-subgrid col-span-4 gap-4">
      <div className="">{productDetails}</div>
      <div>{quantity}</div>
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

        <div className="font-bold">PRODUCT DETAILS</div>
        <div className="font-bold">QUANTITY</div>
        <div className="font-bold">PRICE</div>
        <div className="font-bold">TOTAL</div>

        <div className="font-bold">{items.length} Items</div>
        <div className="font-bold">$327.98</div>

        {items.map((item, i) => (
          <Item
            key={i}
            productDetails={item.productDetails}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
          />
        ))}

        <div className="font-bold row-start-4 col-start-5">SHIPPING</div>
        <div className="row-start-5 col-start-5">dropdown menu</div>
        <div className="row-start-6 col-start-5 col-span-2">
          <hr className="border-gray-300"/>
        </div>
        <div className="row-start-7 col-start-5 font-bold">TOTAL COST</div>
        <div className="row-start-7 col-start-6 font-bold">500.12</div>

      </div>

      <button>Continue Shopping</button>
    </>
  )
}

export default Cart;