import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BooksCard = (props) => {
  return (
    <div className="relative border p-4 text-center group bg-white rounded-md">
      <Link to={`/book/${props.bookId}`}>
        <img
          className="w-24 sm:w-32 md:w-44 block mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          src={props.image}
          alt={`Contains book cover of ${props.title}`}
        />
        <img
          className="w-32 sm:w-44 md:w-72 block mx-auto absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
          src={props.hoverImage}
          alt={props.title}
        />
      </Link>
      <p className="mt-2 text-sm font-bold mb-4 text-slate-600">
        {props.title}
      </p>
      <div className="flex items-center justify-center gap-2 mt-4 mx-auto max-w-xs">
        <button className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
          Baixar
        </button>
        <button type="button" onClick={props.onClickHeart}>
          <span className="bg-slate-200 rounded-md p-2 hover:bg-slate-400 text-xl flex justify-center">
            <ion-icon
              name={props.isFavorite ? "heart" : "heart-outline"}
            ></ion-icon>
          </span>
        </button>
      </div>
    </div>
  );
};

BooksCard.propTypes = {
  bookId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hoverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onClickHeart: PropTypes.func.isRequired,
};

export default BooksCard;
