import Color, { Palette } from "color-thief-react";

const CardItem = (props) => {
  const { children } = props;
  return <div className="bg-white flex flex-col rounded-xl shadow-lg shadow-gray-400/10 pb-2 overflow-hidden">{children}</div>;
};

const Header = (props) => {
  const { img } = props;
  return (
    <Palette src={img} crossOrigin="anonymous" format="hex" colorCount={4}>
      {({ data, loading }) => {
        if (loading) return <p>loading</p>;
        return (
          <div style={{ backgroundColor: `${data[1]}` }} className="w-full relative h-44  grid place-items-center">
            <div className="absolute w-full h-full bg-white/10"></div>
            <img src={img} className="w-20 aspect-square drop-shadow-[6px_12px_0px_rgba(0,0,0,0.2)] "></img>
          </div>
        );
      }}
    </Palette>
  );
};

const Body = (props) => {
  const { title, children, price } = props;
  return (
    <>
      <h1 className="text-xl font-semibold tracking-wider mb-2">{title}</h1>
      <p className="text-sm h-20">{children}</p>
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-lg">$ {price}</p>
        <div className="flex h-9 items-center  rounded-lg overflow-hidden">
          <button className="bg-lightSoftRed px-2 h-full">
            <img src="./minus-icon.png" alt="minus" />
          </button>
          <p className="px-4">1</p>
          <button className="bg-lightSoftGreen px-2 h-full">
            <img src="./plus-icon.png" alt="minus" />
          </button>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <button className="py-3 flex justify-center bg-lightBlue2 rounded-lg border-2 border-darkBlue2 w-full">
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
