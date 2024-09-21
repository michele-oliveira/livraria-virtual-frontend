import { Link, useNavigate } from "react-router-dom";
import toast from "./react-stacked-toast";
import PropTypes from "prop-types";
import UnauthorizedError from "../errors/http/UnauthorizedError";
import { addBookToFavorites } from "../api/users/users.api";

const BooksCard = (props) => {
  const navigate = useNavigate();

  const addToFavorites = async (bookId) => {
    try {
      await addBookToFavorites(bookId);
      toast({
        title: "O livro foi adicionado aos favoritos",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        toast({
          title: "Acesso não permitido",
          description: "Por favor, faça o login antes de acessar esta página",
          type: "error",
          duration: 3000,
        });
        navigate("/login");
      } else {
        toast({
          title: "Houve um erro inesperado",
          description: "Por favor, tente novamente",
          type: "error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="relative border p-4 text-center group bg-white rounded-md">
      <Link to={`/book/${props.bookId}`}>
        <img
          className="w-24 sm:w-32 md:w-44 block mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          src={props.image}
          alt="Star Wars Trilogia"
        />
        <img
          className="w-32 sm:w-44 md:w-72 block mx-auto absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
          src={props.hoverImage}
          alt="Star Wars Trilogia Hover"
        />
      </Link>
      <p className="mt-2 text-sm font-bold mb-4 text-slate-600">
        {props.title}
      </p>
      <div className="flex items-center justify-center gap-2 mt-4 mx-auto max-w-xs">
        <button className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
          Baixar
        </button>
        <button type="button" onClick={() => addToFavorites(props.bookId)}>
          <span className="bg-slate-200 rounded-md p-2 hover:bg-slate-400 text-xl flex justify-center">
            <ion-icon name="heart"></ion-icon>
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
};

export default BooksCard;
