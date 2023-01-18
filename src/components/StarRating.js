import { AiFillStar, AiOutlineStar } from "react-icons/ai";
function StarRating(props) {
  return Array(props.max)
    .fill(0)
    .map((_, i) =>
      i < Math.floor(props.rating) ? (
        <AiFillStar key={i} className="text-[#16213E]-400 inline-flex" />
      ) : (
        <AiOutlineStar key={i} className="text-[#16213E]-400 inline-flex" />
      )
    );
}

export default StarRating;
