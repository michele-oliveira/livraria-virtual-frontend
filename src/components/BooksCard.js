import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFileNameFromDownloadUrl } from "../utils/download";

const BooksCard = (props) => {
  return (
    <div className="relative border p-4 text-center group bg-white rounded-md">
      <Link to={`/book/${props.bookId}`}>
        <div className="relative flex h-24 md:h-60 lg:h-64 xl:h-80 2xl:h-[24rem] items-center justify-center">
          <img
            className="block max-w-full max-h-full mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            src={props.image}
            alt={`Contains book cover of ${props.title}`}
          />
          <img
            className="block max-w-full max-h-full mx-auto absolute transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
            src={props.hoverImage}
            alt={props.title}
          />
        </div>
      </Link>
      <p className="mt-2 text-sm font-bold mb-4 text-slate-600">
        {props.title}
      </p>
      <div className="flex items-center justify-center gap-2 mt-4 mx-auto max-w-xs">
        <a
          href={props.downloadUrl}
          download={getFileNameFromDownloadUrl(props.downloadUrl) || "book.pdf"}
          target="_blank"
          rel="noreferrer"
          className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
        >
          Baixar
        </a>
        {props.canAddFavorite && props.onClickHeart && (
          <button type="button" onClick={props.onClickHeart}>
            <span className="bg-slate-200 rounded-md p-2 hover:bg-slate-400 text-xl flex justify-center">
              <ion-icon
                name={props.isFavorite ? "heart" : "heart-outline"}
              ></ion-icon>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

BooksCard.propTypes = {
  bookId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hoverImage: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string.isRequired,
  canAddFavorite: PropTypes.bool,
  isFavorite: PropTypes.bool,
  onClickHeart: PropTypes.func,
};

export default BooksCard;
