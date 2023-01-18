import React, { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import RestaurantCard from "../../../components/RestaurantCard";
import { MainApi } from "../../../apis";
import Errormsg from "../../../config/errormsg";

function Home() {
  const toggleOpen = () => {
    setParam((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };
  const [isModalPriceOpen, setIsModalPriceOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [Category, setCategory] = useState([]);
  const [param, setParam] = useState({
    isOpen: false,
    minPrice: 0,
    maxPrice: 0,
    categoryId: "",
  });
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  const toggleCategory = (value) => {
    setParam((prevState) => ({
      ...prevState,
      categoryId: value,
    }));
  };
  const toggleMinPrice = (value) => {
    setParam((prevState) => ({
      ...prevState,
      minPrice: value,
    }));
  };
  const toggleMaxPrice = (value) => {
    setParam((prevState) => ({
      ...prevState,
      maxPrice: value,
    }));
  };
  const clearFilter = () => {
    setParam((prevState) => ({
      ...prevState,
      isOpen: false,
      minPrice: 0,
      maxPrice: 0,
      categoryId: "",
    }));
  };
  const filteredRestaurents = restaurants
    .filter((resto) => (param.isOpen ? resto.open : true))
    .filter((resto) => {
      if (param.minPrice > 0 && param.maxPrice > 0) {
        return resto.price >= param.minPrice && resto.price <= param.maxPrice;
      } else if (param.minPrice > 0) {
        return resto.price >= param.minPrice;
      } else if (param.maxPrice > 0) {
        return resto.price <= param.maxPrice;
      } else {
        return true;
      }
    });
  const itemPerPage = 8;
  const totalPage = Math.ceil(filteredRestaurents.length / itemPerPage);
  const paginatedRestaurants = filteredRestaurents.slice(0, page * itemPerPage);
  useEffect(() => {
    MainApi.restaurants(param)
      .catch((error) => {
        window.alert(Errormsg[500]);
      })
      .then((data) => {
        setRestaurants(data);
      });
    MainApi.categories()
      .catch((error) => {
        window.alert(Errormsg[500]);
      })
      .then((data) => {
        setCategory(data);
      });
  }, [param]);
  useEffect(() => {
    setCanLoadMore(page < totalPage);
  }, [page, totalPage]);
  return (
    <>
      <div className="bg-gray-50 min-h-screen h-full py-4 px-4 sm:px-8 md:px-12">
        <div className="mb-6">
          <h1 className="text-2xl md:text-4xl">Restaurants</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Filter Start */}
          <div className="mt-10 py-2 px-2 border-t border-b border-gray-400 flex items-start md:items-center md:justify-between flex-col md:flex-row">
            <div className="flex flex-start md:items-center justify-center flex-col md:flex-row">
              <p className="text mr-2">Filter By</p>
              <div className="flex items-center justify-center flex-wrap">
                <button
                  className="p-1 my-1 md:px-2 mr-2 flex justify-between items-center cursor-pointer"
                  onClick={toggleOpen}
                >
                  {param.isOpen ? (
                    <p className="w-5 h-5 mr-2 inline-flex border border-gray-400 bg-green-500 rounded-full"></p>
                  ) : (
                    <p className="w-5 h-5 mr-2 inline-flex border border-gray-400 rounded-full"></p>
                  )}
                  Open Now
                </button>
                <div className="relative">
                  <button
                    className="p-1 my-1 md:px-2 mr-2 flex justify-between items-center border rounded-sm border-gray-400 cursor-pointer"
                    onClick={() => setIsModalPriceOpen(!isModalPriceOpen)}
                  >
                    <p className="px-1">Price</p>
                    <AiOutlineDown className="px-1 text-xl" />
                  </button>
                  {isModalPriceOpen && (
                    <div className="absolute top-10 w-full bg-gray-400 border-2 rounded-md p-1">
                      <div>
                        <p>Min</p>
                        <input
                          type="number"
                          className="w-full border border-gray-400"
                          value={param.minPrice}
                          onChange={(e) => toggleMinPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <p>Max</p>
                        <input
                          type="number"
                          className="w-full border border-gray-400"
                          value={param.maxPrice}
                          onChange={(e) => toggleMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <select
                  className="p-1 md: px-2 my-1 mr-2 flex justify-between items-center border rounded-sm border-gray-400 cursor-pointer bg-transparent"
                  value={param.categoryId}
                  onChange={(e) => toggleCategory(e.target.value)}
                >
                  <option hidden selected value="">
                    Category
                  </option>
                  {Category?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-2 md:my-0">
              <button
                className="py-1 px-3 border rounded-md border-gray-400 cursor-pointer"
                onClick={clearFilter}
              >
                Clear All
              </button>
            </div>
          </div>
          {/* Filter End */}
          {/* Section Restaurant item Start */}
          <div className="my-10">
            <h3 className="text-2xl">All Restaurants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto my-8 gap-6">
              {paginatedRestaurants.map(function (resto) {
                return (
                  <RestaurantCard
                    name={resto.name}
                    key={resto.id}
                    id={resto.id}
                    images={resto.images[0]}
                    isOpen={resto.open}
                    price={resto.price}
                    rating={resto.rating}
                  />
                );
              })}
            </div>
            {canLoadMore && (
              <div className="w-full md:w-1/2 mx-auto">
                <button
                  className="w-full border-2 border-[#16213E] rounded-md py-2"
                  onClick={onLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          {/* Section Restaurant item End */}
        </div>
      </div>
    </>
  );
}

export default Home;
