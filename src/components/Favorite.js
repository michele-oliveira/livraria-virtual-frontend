import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Favorite = ({ bookId, image, hoverImage, title, onRemoveFromFavorites }) => {
  return (
    <div className="relative border p-4 text-center group bg-white rounded-md">
      <Link to={`/book/${bookId}`}>
        <div className="relative flex h-24 md:h-60 lg:h-64 xl:h-80 2xl:h-[24rem] items-center justify-center">
          <img
            className="block max-w-full max-h-full mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            src={image}
            alt={`Contains book cover of ${title}`}
          />
          <img
            className="block max-w-full max-h-full mx-auto absolute transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
            src={hoverImage}
            alt={title}
          />
        </div>
      </Link>
      <p className="mt-2 text-sm font-bold mb-4 text-slate-600">
        {title}
      </p>
      <div className="flex flex-col items-center gap-2 mt-4 mx-auto max-w-xs ">
        <button className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
          Baixar
        </button>
        <button
          type="button"
          onClick={() => onRemoveFromFavorites(bookId)}
          className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
        >
          Remover dos favoritos
        </button>
      </div>
    </div>
  );
};

Favorite.propTypes = {
  bookId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hoverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired
};

export default Favorite;
