import Color, { Palette } from "color-thief-react";
import { useContext, useState } from "react";
import { CardItemContext, CardItemProvider } from "../../contexts/CardItemContext";
import { CartContextDispatch } from "../../contexts/CartContext";

const CardItem = (props) => {
  const { children } = props;
  return (
    <CardItemProvider>
      <div className="flex flex-col pb-2 overflow-hidden bg-white shadow-lg rounded-xl shadow-gray-400/10">{children}</div>
    </CardItemProvider>
  );
};

const Header = (props) => {
  const { img } = props;
  return (
    <Palette src={img} crossOrigin="anonymous" format="hex" colorCount={4}>
      {({ data, loading }) => {
        if (loading) return <div className="relative grid w-full bg-gray-200 h-44 place-items-center animate-pulse"></div>;

        return (
          <div style={{ backgroundColor: `${data[1]}` }} className="relative grid w-full h-44 place-items-center">
            <div className="absolute w-full h-full bg-white/10"></div>
            <img src={img} className="w-20 aspect-square drop-shadow-[6px_12px_0px_rgba(0,0,0,0.2)]"></img>
          </div>
        );
      }}
    </Palette>
  );
};

const Body = (props) => {
  const { title, children, price } = props;
  const { qty, increaseQty, decreaseQty } = useContext(CardItemContext);

  return (
    <>
      <h1 className="mb-2 text-xl font-bold tracking-wider">{title}</h1>
      <p className="h-20 text-sm">{children}</p>
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">$ {price}</p>
        <div className="flex items-center overflow-hidden rounded-lg h-9">
          <button onClick={() => decreaseQty()} className={`h-full px-2 bg-lightSoftRed ${qty == 1 ? "opacity-35" : ""}`}>
            <img src="./minus-icon.png" alt="minus" />
          </button>
          <p className="w-10 text-center">{qty}</p>
          <button onClick={() => increaseQty()} className="h-full px-2 bg-lightSoftGreen">
            <img src="./plus-icon.png" alt="minus" />
          </button>
        </div>
      </div>
    </>
  );
};

const Footer = (props) => {
  const { id, name, price, img } = props;
  const { dispatch } = useContext(CartContextDispatch);
  const { qty, setQty } = useContext(CardItemContext);

  const handleAddToCart = () => {
    dispatch({ type: "ADD", payload: { id, name, price, img, qty } });
    setQty(1);
  };

  return (
    <button onClick={handleAddToCart} className="flex justify-center w-full py-3 border-2 rounded-lg bg-lightBlue2 border-darkBlue2">
      <div className="flex items-start">
        <img src="./cart-card.png" alt="" />
        <p className="text-sm font-bold text-darkBlue2">Add To Cart</p>
      </div>
    </button>
  );
};

CardItem.Header = Header;
CardItem.Body = Body;
CardItem.Footer = Footer;

export default CardItem;
