import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header.js";
import Nav from "../components/Nav.js";
import BooksCard from "../components/BooksCard.js";
import Footer from "../components/Footer.js";

import card from "../assets/images/car1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);
  const intervalTime = 5000;
  const totalSlides = 3;

  const goToNextSlide = useCallback(function goToNextSlide() {
    const newSlide = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  }, [currentSlide]);

  function goToSlide(slide) {
    setCurrentSlide(slide);
  }

  async function fetchBooks() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`);
    const books = await response.json();
    
    setBooks(books);
  }

  useEffect(() => {
    fetchBooks();
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
            {books.map((book) => (
              <BooksCard
                key={book.id}
                bookId={book.id}
                image={book.image_1}
                hoverImage={book.image_2}
                title={book.book_name}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default App;
