import Header from "../components/Header.js";
import card from "../assets/images/car1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import Nav from "../components/Nav.js";
import { Link } from "react-router-dom";
import star from "../assets/images/livrostar.jpg";
import starwars from "../assets/images/livrostarwars.png";
import BooksCard from "../components/BooksCard.js";
import Footer from "../components/Footer.js";

function App() {
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
                  className="w-3 h-3 bg-gray-400 rounded-full indicator"
                  onclick="goToSlide(0)"
                ></button>
                <button
                  className="w-3 h-3 bg-gray-400 rounded-full indicator"
                  onclick="goToSlide(1)"
                ></button>
                <button
                  className="w-3 h-3 bg-gray-400 rounded-full indicator"
                  onclick="goToSlide(2)"
                ></button>
              </div>
            </div>
          </header>
        </div>
        <Nav />
        <section className="pt-10 p-5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <BooksCard
                key={index}
                image={star}
                hoverImage={starwars}
                title="Trilogia Star Wars"
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
