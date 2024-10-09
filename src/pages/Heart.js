import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Loading from "../components/Loading";
import Favorite from "../components/Favorite";
import List from "../components/List";
import Footer from "../components/Footer";
import {
  getFavoriteBooks,
  removeBookFromFavorites,
} from "../api/users/users.api";
import UnauthorizedError from "../errors/http/UnauthorizedError";
import toast from "../components/react-stacked-toast";

const Heart = () => {
  const [favoriteBooks, setFavoriteBooks] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  const emptyFavoriteBooks = () => {
    try {
      setFavoriteBooks([]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavoriteBook = (bookId) => {
    if (favoriteBooks) {
      const updatedFavoriteBooks = favoriteBooks.filter(
        (book) => book.id !== bookId
      );
      setFavoriteBooks([...updatedFavoriteBooks]);
    }
  };

  const fetchFavoriteBooks = async () => {
    try {
      const favoriteBooks = await getFavoriteBooks();
      setFavoriteBooks(favoriteBooks);
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedError) {
        toast({
          title: "Acesso não permitido",
          description: "Por favor, faça o login antes de acessar esta página",
          type: "error",
          duration: 2500,
        });
        navigate("/login");
      } else {
        toast({
          title: "Erro inesperado",
          description: "Houve um erro durante a sincronização de dados",
          type: "error",
          duration: 2500,
        });
        emptyFavoriteBooks();
      }
    }
  };

  const removeFromFavorites = async (bookId) => {
    try {
      await removeBookFromFavorites(bookId);
      toast({
        title: "O livro foi removido dos favoritos",
        type: "success",
        duration: 2000,
      });
      removeFavoriteBook(bookId);
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
    <div className="bg-gray-100">
      <Header />
      <Nav />
      <section className="pt-10 mb-5">
        {favoriteBooks ? (
          <List
            data={favoriteBooks}
            component={() => (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
                {favoriteBooks.map((book) => (
                  <Favorite
                    bookId={book.id}
                    image={book.image_1}
                    hoverImage={book.image_2}
                    title={book.book_name}
                    onRemoveFromFavorites={removeFromFavorites}
                    key={book.id}
                  />
                ))}
              </div>
            )}
            emptyComponent={() => (
              <div className="border rounded-lg m-5 p-5 flex flex-col justify-center items-center bg-white ">
                <p className="text-gray-800 font-bold">
                  Você ainda não possui nenhum livro favorito
                </p>
                <p className="mt-5 text-gray-900 text-sm">
                  Você pode adicionar seus livros favoritos na página inicial
                </p>
              </div>
            )}
          />
        ) : (
          <Loading text="Carregando livros..." />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Heart;
