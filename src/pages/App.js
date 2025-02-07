import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import toast from "../components/react-stacked-toast";
import Container from "../components/Container.js";
import Content from "../components/Content.js";
import Header from "../components/Header.js";
import Carousel from "../components/Carousel.js";
import Nav from "../components/Nav.js";
import Loading from "../components/Loading.js";
import List from "../components/List.js";
import BooksCard from "../components/BooksCard.js";
import Pagination from "../components/Pagination.js";
import Footer from "../components/Footer.js";
import { getBooks } from "../api/books/books.api.js";
import {
  addBookToFavorites,
  getFavoriteBooks,
  removeBookFromFavorites,
} from "../api/users/users.api.js";
import { getJwt } from "../utils/jwt.js";
import { UserRole } from "../enums/UserRole.js";
import { ITEMS_PER_PAGE } from "../constants/config.js";
import UnauthorizedError from "../errors/http/UnauthorizedError.js";

function App() {
  const [books, setBooks] = useState();
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const canAddBookToFavorites = user?.role === UserRole.USER;

  const fetchBooks = async (search, page, subgenderId) => {
    try {
      const { books, totalPages } = await getBooks(
        search,
        page,
        ITEMS_PER_PAGE,
        subgenderId
      );
      setBooks(books);
      setTotalPages(totalPages);
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
        const { books } = await getFavoriteBooks();
        const favoriteBooksIds = books?.map((book) => book.id) || [];
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
    if (user?.role === UserRole.USER) {
      fetchFavoriteBooks();
    }
  }, [user?.role]);

  useEffect(() => {
    const search = searchParams.get("search");
    const subgenderId = searchParams.get("subgender_id");

    fetchBooks(search, currentPage, subgenderId);
  }, [searchParams, currentPage]);

  return (
    <Container className="bg-gray-100">
      <Header />
      <Carousel />
      <Nav />
      <Content>
        <section className="pt-10 p-5">
          {books ? (
            <List
              data={books}
              component={() => (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 p-5">
                  {books.map((book) => (
                    <BooksCard
                      key={book.id}
                      bookId={book.id}
                      title={book.book_name}
                      image={book.image_1}
                      hoverImage={book.image_2}
                      downloadUrl={book.book_file}
                      canAddFavorite={canAddBookToFavorites}
                      isFavorite={favoriteBooks.includes(book.id)}
                      onClickHeart={() => handleClickHeartButton(book.id)}
                    />
                  ))}
                </div>
              )}
              emptyComponent={() => (
                <div className="border rounded-lg m-5 p-5 flex flex-col justify-center items-center bg-white ">
                  <p className="text-gray-800 font-bold">
                    Nenhum livro encontrado
                  </p>
                  <p className="mt-5 text-gray-900 text-sm">
                    A busca não retornou nenhum livro. Se você acha que isto
                    pode ser um erro de sistema, por favor, contate o suporte.
                  </p>
                </div>
              )}
            />
          ) : (
            <Loading text="Carregando livros..." />
          )}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Content>

      <Footer />

      {user?.role === UserRole.ADMIN && (
        <div className="fixed bottom-6 right-5">
          <button
            type="button"
            onClick={() => navigate("/new-book")}
            className="flex items-center px-3 py-2 rounded-lg bg-slate-800 hover:brightness-125"
          >
            <span className="flex text-xl text-white">
              <ion-icon name="add-outline"></ion-icon>
            </span>
            <h5 className="ml-1 text-white font-semibold">Novo livro</h5>
          </button>
        </div>
      )}
    </Container>
  );
}

export default App;
