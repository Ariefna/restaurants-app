import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailApi } from "../../../apis";
import Errormsg from "../../../config/errormsg";
import StarRating from "../../../components/StarRating";
const Detail = () => {
  const [restaurant, setRestaurant] = useState(null);
  let params = useParams();

  useEffect(() => {
    DetailApi.detail(params)
      .catch((error) => {
        window.alert(Errormsg[500]);
      })
      .then((data) => {
        setRestaurant(data);
      });
  }, []);
  return (
    restaurant !== null && (
      <div className="bg-gray-50 min-h-screen h-full py-4 px-4 sm:px-8 md:px-12">
        <div className="flex flex-col lg:px-40 xl:px-60">
          <div className="flex items-center justify-center flex-col lg:flex-row">
            {restaurant.images.map((url, idx) => (
              <img
                key={url}
                src={url}
                alt={`restaurant${idx + 1}`}
                className="w-full h-60 object-cover"
              />
            ))}
          </div>
          <h3 className="text-2xl font-bold">{restaurant.name}</h3>
          <p className="flex">
            <StarRating max={5} rating={restaurant.rating} />
          </p>

          <div className="w-full my-8 rounded-md">
            <h1 className="text-4xl p-2 text-center">Reviews</h1>
            {restaurant.reviews.map((review) => (
              <div key={review.id} className="">
                <h4 className="text-xl font-medium">{review.name}</h4>
                <StarRating max={5} rating={review.rating} />
                <p className="py-2">{review.text}</p>
                <div className="flex items-center">
                  {review.images.map((url, idx) => (
                    <img
                      key={url}
                      src={url}
                      alt={`restaurant-${idx + 1}`}
                      className="w-20 h-20 mx-1 object-cover"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Detail;
