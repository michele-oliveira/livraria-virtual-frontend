import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from 'prop-types';
import toast from "../components/react-stacked-toast";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Item from "../components/Item";
import Footer from "../components/Footer";
import { deleteBook, getBook } from "../api/books/books.api";
import {
  addBookToFavorites,
  getFavoriteBooks,
  removeBookFromFavorites,
} from "../api/users/users.api";
import { deleteJwt, getJwt } from "../utils/jwt";
import { getFileNameFromDownloadUrl } from "../utils/download";
import UnauthorizedError from "../errors/http/UnauthorizedError";
import { UserRole } from "../enums/UserRole";

const BookItem = ({ 
  data: book,
  canAddFavorite,
  isFavorite,
  handleClickHeartButton,
  canEdit,
  handleClickEditButton,
  canDelete,
  handleClickDeleteButton
}) => (
  <div className="flex justify-center">
    <section className="flex flex-col mt-4 md:flex-row p-6 rounded-lg max-w-[96rem]">
      <div className="flex-shrink-0 relative p-5">
        <div className="flex justify-center">
          <img
            className="w-56 sm:w-64 md:w-72 rounded-lg shadow-md transition-opacity duration-300 ease-in-out group-hover:opacity-80"
            src={book.image_1}
            alt={`Contains the book cover of ${book.book_name}`}
          />
        </div>

        <div className="w-full flex justify-center gap-2 p-5">
          <a
            href={book.book_file}
            download={getFileNameFromDownloadUrl(book.book_file) || "book.pdf"}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-200 text-black px-2 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm flex items-center justify-center w-32 h-12"
          >
            Baixar
          </a>
          {(canAddFavorite && handleClickHeartButton) && (
            <button
              type="button"
              onClick={handleClickHeartButton}
              className="flex items-center justify-center w-12 h-12"
            >
              <span className="bg-slate-200 rounded-md p-3 hover:bg-slate-400 text-xl flex justify-center">
                <ion-icon name={isFavorite ? "heart" : "heart-outline"}></ion-icon>
              </span>
            </button>
          )}
          {(canEdit && handleClickEditButton) && (
            <button
              type="button"
              onClick={handleClickEditButton}
              className="flex items-center justify-center w-12 h-12"
            >
              <span className="bg-slate-200 rounded-md p-3 hover:bg-slate-400 text-xl flex justify-center">
                <ion-icon name="pencil-outline"></ion-icon>
              </span>
            </button>
          )}
          {(canDelete && handleClickDeleteButton) && (
            <button
              type="button"
              onClick={handleClickDeleteButton}
              className="flex items-center justify-center w-12 h-12"
            >
              <span className="text-red-600 bg-slate-200 rounded-md p-3 hover:bg-slate-400 text-xl flex justify-center">
                <ion-icon name="trash-outline"></ion-icon>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 p-10 mt-5 md:ml-4 bg-white border rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 pb-5">
          {book.book_name.toUpperCase()}
        </h1>
        <p className="text-gray-500">Editora: {book.publisher}</p>
        <p className="text-gray-500">Idioma: {book.language}</p>
        <p className="text-gray-500">Páginas: {book.pages}</p>
        <p className="text-gray-500">Gênero: {book.subgender.gender.name}</p>
        <p className="text-gray-500">Subgênero: {book.subgender.name}</p>
        {book.description.split("\n").map((p, index) => (
          <p className="text-gray-700 leading-relaxed text-sm mt-4" key={index}>
            {p}
          </p>
        ))}
      </div>
    </section>
  </div>
);

BookItem.propTypes = {
  data: PropTypes.object.isRequired,
  canAddFavorite: PropTypes.bool,
  isFavorite: PropTypes.bool,
  handleClickHeartButton: PropTypes.func,
  canEdit: PropTypes.bool,
  handleClickEditButton: PropTypes.func,
  canDelete: PropTypes.bool,
  handleClickDeleteButton: PropTypes.func,
};

const Book = () => {
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();

  const fetchBook = async (bookId) => {
    try {
      setIsLoading(true);
      const book = await getBook(bookId);
      setBook(book);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Houve um erro durante o carregamento deste livro",
        type: "error",
        duration: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsFavorite = async (bookId) => {
    try {
      const jwt = getJwt();
      if (jwt) {
        const { books } = await getFavoriteBooks();
        if (books?.find((book) => book.id === bookId)) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Houve um erro durante a verificação dos dados do livro",
        type: "error",
        duration: 2500,
      });
    }
  };

  const addToFavorites = async (bookId) => {
    try {
      await addBookToFavorites(bookId);
      setIsFavorite(true);
      toast({
        title: "O livro foi adicionado aos favoritos",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedError) {
        toast({
          title: "Acesso não permitido",
          description: "Por favor, faça o login antes de utilizar este recurso",
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

  const removeFromFavorites = async (bookId) => {
    try {
      await removeBookFromFavorites(bookId);
      setIsFavorite(false);
      toast({
        title: "O livro foi removido dos favoritos",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        toast({
          title: "Acesso não permitido",
          description: "Por favor, faça o login antes de utilizar este recurso",
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

  const exclude = async (bookId) => {
    try {
      await deleteBook(bookId);
      toast({
        title: "O livro foi excluído",
        type: "success",
        duration: 2000,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        toast({
          title: "Acesso não permitido",
          description: "Por favor, faça o login antes de utilizar este recurso",
          type: "error",
          duration: 3000,
        });
        clearUser();
        deleteJwt();
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
  }

  const handleClickHeartButton = () => {
    if (isFavorite) {
      removeFromFavorites(params.bookId);
    } else {
      addToFavorites(params.bookId);
    }
  };

  const handleClickEditButton = () => {
    navigate(`/edit-book/${params.bookId}`);
  }

  const handleClickDeleteButton = () => {
    exclude(params.bookId);
  }

  useEffect(() => {
    fetchBook(params.bookId);
    checkIsFavorite(params.bookId);
  }, [params.bookId]);

  return (
    <div className="bg-gray-100">
      <Header />
      <Nav />
      {isLoading ? (
        <Loading text="Carregando detalhes do livro..." />
      ) : (
        <Item
          data={book}
          component={(data) => user?.role === UserRole.ADMIN ? (
            <BookItem
              data={data}
              canEdit
              handleClickEditButton={handleClickEditButton}
              canDelete
              handleClickDeleteButton={handleClickDeleteButton}
            />
          ) : (
            <BookItem
              data={data}
              canAddFavorite
              isFavorite={isFavorite}
              handleClickHeartButton={handleClickHeartButton}
            />
            )
          }
          emptyComponent={() => (
            <div className="border rounded-lg m-5 mt-10 p-5 flex flex-col justify-center items-center bg-white ">
              <p className="text-gray-800 font-bold">Livro não encontrado</p>
              <p className="mt-5 text-gray-900 text-sm">
                O livro que você está procurando não existe ou pode ter sido
                removido
              </p>
            </div>
          )}
        />
      )}
      <Footer />
    </div>
  );
};

export default Book;
