import { Link } from "react-router-dom";
import { formatNumber } from "../utils/FormatUtil";
import StarRating from "./StarRating";
function RestaurantCard(props) {
  return (
    <div key={props.id}>
      <img
        src={props.images}
        alt="produk-item"
        className="w-full h-64 object-cover rounded-sm mb-4"
      />
      <div className="px-2 pb-6">
        <p className="text-xl font-bold">{props.name}</p>
        <StarRating max={5} rating={props.rating} />
        <div className="flex items-end justify-between">
          <div>
            <p>{props.categoryname}</p>
            <p>$ {formatNumber(props.price)}</p>
          </div>
          <div className="flex items-center justify-between mx-1 ">
            {props.isOpen ? (
              <>
                <p className="w-3 h-3 bg-green-500 border border-green-500 rounded-xl"></p>
                <p className="mx-1">Open</p>
              </>
            ) : (
              <>
                <p className="w-3 h-3 bg-red-500 border border-red-bg-red-500 rounded-xl"></p>
                <p className="mx-1">Closed</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Link to={`/detail/${props.id}`}>
        <button className="bg-[#16213E] text-white w-full py-2 my-2 rounded-sm">
          Learn More
        </button>
      </Link>
    </div>
  );
}

export default RestaurantCard;
