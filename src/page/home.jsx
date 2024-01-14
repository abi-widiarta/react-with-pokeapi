import { useEffect, useState } from "react";
import CardItem from "../components/fragments/CardItem";
import Cart from "../components/fragments/Cart";
import { getItems, getItemDetail } from "../services/products.service";

const HomePage = () => {
  const [allItems, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    getItems((status, response) => {
      if (status) {
        setItems(response);
      }
    });
  }, []);

  useEffect(() => {
    if (allItems && allItems.length > 0) {
      const fetchItemDetails = async () => {
        const promises = allItems.map((item) => {
          return new Promise((resolve) => {
            getItemDetail(item.url, (status, response) => {
              if (status) {
                resolve(response);
              } else {
                resolve(null); // or handle the error accordingly
              }
            });
          });
        });

        const itemDetailsArray = await Promise.all(promises);
        setItemDetails(itemDetailsArray.filter((detail) => detail !== null));
        console.log(itemDetails);
      };

      fetchItemDetails();
    }
  }, [allItems]);

  // useEffect(() => {
  //   if (itemDetails && itemDetails.length > 0) {
  //     console.log(itemDetails);
  //   }
  // }, [itemDetails]);

  return (
    <div className="relative w-full h-screen px-12 pt-20">
      <nav className="bg-lighBlue px-12 py-2.5 fixed top-0 left-0 w-full z-10 shadow-lg shadow-gray-200">
        <div className="flex items-center space-x-2">
          <img src="./logo.png" alt="logo" />
          <p className="text-lg font-bold tracking-widest text-darkBlue">PokeMart</p>
        </div>
      </nav>
      <main>
        <h1 className="mb-8 text-2xl font-bold tracking-normal text-textDarkBlue">Welcome Trainers!, choose your item!</h1>
        <div className="flex w-full gap-10">
          <div className="w-[70%] grid grid-cols-3 gap-6">
            {itemDetails.map((item, index) => {
              return (
                <CardItem key={index}>
                  <CardItem.Header img={item.data.sprites.default}></CardItem.Header>
                  <div className="px-4 py-4">
                    <CardItem.Body title={item.data.name} price={item.data.cost}>
                      {item.data.effect_entries[0].short_effect}
                    </CardItem.Body>
                    <CardItem.Footer img={item.data.sprites.default} id={item.data.id} name={item.data.name} price={item.data.cost}></CardItem.Footer>
                  </div>
                </CardItem>
              );
            })}
          </div>
          <div className="w-[30%] h-full">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
