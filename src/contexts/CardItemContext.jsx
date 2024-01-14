import { createContext, useState } from "react";

const CardItemContext = createContext();

const CardItemProvider = ({ children }) => {
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  return <CardItemContext.Provider value={{ qty, setQty, increaseQty, decreaseQty }}>{children}</CardItemContext.Provider>;
};

export { CardItemProvider, CardItemContext };
