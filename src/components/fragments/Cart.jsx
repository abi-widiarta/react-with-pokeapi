import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let sumPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);

    let sumQty = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    setTotalPrice(sumPrice);
    setTotalItem(sumQty);
  }, [cart]);

  return (
    <div className="w-full px-4 py-6 bg-white border-y-8 rounded-xl border-lighBlue">
      <div className="flex mb-6 space-x-2">
        <img src="./cart-icon.svg" alt="" />
        <h1 className="text-xl font-extrabold">
          Cart <span className="text-base font-semibold text-gray-500">({totalItem}) </span>{" "}
        </h1>
      </div>

      <div className="mb-10 space-y-2">
        {cart.length > 0 &&
          cart.map((item, index) => {
            if (item.qty != 0) {
              return <CartItem key={index} id={item.id} name={item.name} qty={item.qty} price={item.price} img={item.img} />;
            }
          })}

        {cart.length == 0 && <p className="font-semibold text-center text-gray-500">No Item Found</p>}
      </div>

      {cart.length > 0 && (
        <>
          <div className="flex justify-between w-full mb-4">
            <p className="text-lg font-medium ">Total Price : </p>
            <p className="text-xl font-bold">${totalPrice}</p>
          </div>
          <button className="w-full py-2.5 font-bold border rounded-lg border-softGreen bg-lightSoftGreen/80 text-softGreen">Check Out</button>
        </>
      )}
    </div>
  );
};

export default Cart;
