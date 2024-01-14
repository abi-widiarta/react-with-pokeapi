import { useContext } from "react";
import { CartContextDispatch } from "../../contexts/CartContext";

const CartItem = (props) => {
  const { id, name, qty, price, img } = props;
  const { dispatch } = useContext(CartContextDispatch);
  return (
    <div className="flex items-center p-2 rounded-lg bg-lightBlue2">
      <img className="w-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.15)]" src={img} alt="" />
      <div className="flex items-end justify-between w-full pr-2">
        <div>
          <h3 className="mb-1 text-base font-semibold text-gray-500">{name}</h3>
          <p className="text-sm font-bold">${price}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center h-6 overflow-hidden bg-white border rounded-lg">
            <button
              onClick={() => {
                dispatch({
                  type: "DECREASE_QUANTITY",
                  payload: {
                    id,
                  },
                });
              }}
              className={`h-full px-1  ${qty == 1 ? "opacity-35" : ""}`}
            >
              <img className="w-4" src="./minus-icon.png" alt="minus" />
            </button>
            <p className="w-6 text-sm text-center">{qty}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_QUANTITY",
                  payload: {
                    id,
                  },
                });
              }}
              className="h-full px-1 "
            >
              <img className="w-4" src="./plus-icon.png" alt="plus" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Total : ${price * qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
