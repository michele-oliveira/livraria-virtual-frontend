import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { getBook } from "../api/books/books.api";
import toast from "../components/react-stacked-toast";

const Book = () => {
  const [book, setBook] = useState();
  const params = useParams();

  const fetchBook = async (bookId) => {
    try {
      const book = await getBook(bookId);
      setBook(book);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Houve um erro durante a sincronização dos dados",
        type: "error",
        duration: 2500,
      });
    }
  };

  useEffect(() => {
    fetchBook(params.bookId);
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <Nav />
      {book ? (
        <section className="flex flex-col md:flex-row p-6 rounded-lg">
          <div className="flex-shrink-0 relative p-5">
            <img
              className="w-56 sm:w-64 md:w-72 rounded-lg shadow-md transition-opacity duration-300 ease-in-out group-hover:opacity-80"
              src={book.image_1}
              alt={`Contains the book cover of ${book.book_name}`}
            />

            <div className="w-full flex justify-center gap-2 p-5">
              <button className="bg-slate-200 text-black px-2 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm flex items-center justify-center w-32 h-12">
                Baixar
              </button>
              <Link
                to="#"
                className="flex items-center justify-center w-12 h-12"
              >
                <span className="bg-slate-200 rounded-md p-3 hover:bg-slate-400 text-xl flex justify-center">
                  <ion-icon name="heart"></ion-icon>
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center ml-4 mt-4 bg-white border p-10 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 pb-5">
              {book.book_name.toUpperCase()}
            </h1>
            <p className="text-gray-500">Editora: {book.publisher}</p>
            <p className="text-gray-500">Idioma: {book.language}</p>
            <p className="text-gray-500">Páginas: {book.pages}</p>
            <p className="text-gray-500">Gênero: {book.gender}</p>
            {book.description.split("\n").map((p, index) => (
              <p
                className="text-gray-700 leading-relaxed text-sm mt-4"
                key={index}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ) : (
        <div className="border rounded-lg m-5 mt-10 p-5 flex flex-col justify-center items-center bg-white ">
          <p className="text-gray-800 font-bold">
            Livro não encontrado
          </p>
          <p className="mt-5 text-gray-900 text-sm">
            O livro que você está procurando não existe ou pode ter sido
            removido
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Book;
