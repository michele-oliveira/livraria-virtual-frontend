import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "../components/react-stacked-toast";
import Header from "../components/Header.js";
import Nav from "../components/Nav.js";
import BooksCard from "../components/BooksCard.js";
import Footer from "../components/Footer.js";
import { getBooks } from "../api/books/books.api.js";
import {
  addBookToFavorites,
  getFavoriteBooks,
  removeBookFromFavorites,
} from "../api/users/users.api.js";
import { getJwt } from "../utils/jwt.js";
import UnauthorizedError from "../errors/http/UnauthorizedError.js";

import card from "../assets/images/car1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import List from "../components/List.js";
import Loading from "../components/Loading.js";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState();
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const navigate = useNavigate();

  const intervalTime = 5000;
  const totalSlides = 3;

  const goToNextSlide = useCallback(
    function goToNextSlide() {
      const newSlide = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
      setCurrentSlide(newSlide);
    },
    [currentSlide]
  );

  function goToSlide(slide) {
    setCurrentSlide(slide);
  }

  const fetchBooks = async () => {
    try {
      const books = await getBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
      setBooks([]);
      toast({
        title: "Erro inesperado",
        description: "Houve um erro durante a sincronização dos livros",
        type: "error",
        duration: 2500,
      });
    }
  };

  const fetchFavoriteBooks = async () => {
    try {
      const jwt = getJwt();
      if (jwt) {
        const favoriteBooks = await getFavoriteBooks();
        const favoriteBooksIds = favoriteBooks.map((book) => book.id);
        setFavoriteBooks(favoriteBooksIds);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Houve um erro durante a sincronização dos favoritos",
        type: "error",
        duration: 2500,
      });
    }
  };

  const addToFavorites = async (bookId) => {
    try {
      await addBookToFavorites(bookId);
      const updatedFavoriteBooks = favoriteBooks;
      updatedFavoriteBooks.push(bookId);
      setFavoriteBooks([...updatedFavoriteBooks]);
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
      const updatedFavoriteBooks = favoriteBooks.filter(
        (item) => item !== bookId
      );
      setFavoriteBooks([...updatedFavoriteBooks]);
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

  const handleClickHeartButton = (bookId) => {
    if (favoriteBooks.includes(bookId)) {
      removeFromFavorites(bookId);
    } else {
      addToFavorites(bookId);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchFavoriteBooks();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [goToNextSlide]);

  return (
    <>
      <div className="bg-gray-100">
        <div>
          <Header />
          <header className="App-header">
            <div className="relative w-full overflow-hidden pt-5 z-10">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                id="carousel"
                style={{
                  transform: `translateX(${-currentSlide * 100}%)`,
                }}
              >
                <img
                  className="h-48 sm:h-64 md:h-96 w-full object-cover flex-shrink-0"
                  src={card}
                  alt="Card 1"
                />
                <img
                  className="h-48 sm:h-64 md:h-96 w-full object-cover flex-shrink-0"
                  src={card2}
                  alt="Card 2"
                />
                <img
                  className="h-48 sm:h-64 md:h-96 w-full object-cover flex-shrink-0"
                  src={card3}
                  alt="Card 3"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex space-x-2">
                <button
                  className={`w-3 h-3 ${
                    currentSlide === 0 ? "bg-gray-800" : "bg-gray-400"
                  } rounded-full indicator`}
                  onClick={() => goToSlide(0)}
                ></button>
                <button
                  className={`w-3 h-3 ${
                    currentSlide === 1 ? "bg-gray-800" : "bg-gray-400"
                  } rounded-full indicator`}
                  onClick={() => goToSlide(1)}
                ></button>
                <button
                  className={`w-3 h-3 ${
                    currentSlide === 2 ? "bg-gray-800" : "bg-gray-400"
                  } rounded-full indicator`}
                  onClick={() => goToSlide(2)}
                ></button>
              </div>
            </div>
          </header>
        </div>
        <Nav />
        <section className="pt-10 p-5">
          {books ? (
            <List
              data={books}
              component={
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
                  {books.map((book) => (
                    <BooksCard
                      key={book.id}
                      bookId={book.id}
                      image={book.image_1}
                      hoverImage={book.image_2}
                      title={book.book_name}
                      isFavorite={favoriteBooks.includes(book.id)}
                      onClickHeart={() => handleClickHeartButton(book.id)}
                    />
                  ))}
                </div>
              }
              emptyComponent={
                <div className="border rounded-lg m-5 p-5 flex flex-col justify-center items-center bg-white ">
                  <p className="text-gray-800 font-bold">
                    Nenhum livro encontrado
                  </p>
                  <p className="mt-5 text-gray-900 text-sm">
                    A busca não retornou nenhum livro. Se você acha que isto
                    pode ser um erro de sistema, por favor, contate o suporte.
                  </p>
                </div>
              }
            />
          ) : (
            <Loading text="Carregando livros..." />
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default App;
