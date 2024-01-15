import { useEffect, useState } from "react";
import CardItem from "../components/fragments/CardItem";
import Cart from "../components/fragments/Cart";
import { getItems, getItemDetail } from "../services/products.service";
import SkeletonCard from "../components/fragments/SkeletonCard";
import ItemPageLayout from "../components/layouts/ItemPageLayout";

const ItemPage = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/item");
  const [allItems, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems(url, (status, response, prev, next) => {
      if (status) {
        setItems(response);
        setPrevPage(prev);
        setNextPage(next);
      }
    });
  }, [url]);

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
        setLoading(false);
      };

      fetchItemDetails();
    }
  }, [allItems]);

  const navigatePage = (url) => {
    setUrl(url);
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ItemPageLayout>
      <>
        <div className="flex w-full gap-10">
          <div className="w-[70%] grid grid-cols-3 gap-6 items-start">
            {loading == true ? (
              <SkeletonCard />
            ) : (
              itemDetails.map((item, index) => {
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
              })
            )}
          </div>
          <div className="w-[30%] h-full">
            <Cart />
          </div>
        </div>

        <div className="flex mt-4 space-x-4">
          <button onClick={() => navigatePage(prevPage)} className={`p-2 bg-white rounded-lg ${prevPage === null ? "opacity-35 pointer-events-none" : ""}`}>
            <img src="./prev.svg" alt="" />
          </button>
          <button onClick={() => navigatePage(nextPage)} className={`p-2 bg-white rounded-lg ${nextPage === null ? "opacity-35 pointer-events-none" : ""}`}>
            <img src="./next.svg" alt="" />
          </button>
        </div>
      </>
    </ItemPageLayout>
  );
};

export default ItemPage;
