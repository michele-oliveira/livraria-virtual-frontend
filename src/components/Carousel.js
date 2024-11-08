import { useCallback, useEffect, useState } from "react";
import card from "../assets/images/car1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const totalSlides = 3;
  const intervalTime = 5000;

  const goToNextSlide = useCallback(
    function goToNextSlide() {
      const newSlide = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
      setCurrentSlide(newSlide);
    },
    [currentSlide]
  );

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide - 1 < 0 ? totalSlides - 1 : prevSlide - 1
    );
  }, []);

  function goToSlide(slide) {
    setCurrentSlide(slide);
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const swipeDistance = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
      goToNextSlide();
    } else if (swipeDistance < -swipeThreshold) {
      goToPreviousSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [goToNextSlide]);

  return (
    <header className="App-header">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden pt-5 z-10"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          id="carousel"
          style={{
            transform: `translateX(${-currentSlide * 100}%)`,
          }}
        >
          <div className="min-w-full overflow-hidden">
            <img
              className="h-48 sm:h-64 md:h-96 2xl:h-[48rem] w-full object-cover flex-shrink-0 transform scale-125 md:scale-100 transition-transform duration-300"
              src={card}
              alt="Card 1"
            />
          </div>
          <div className="min-w-full overflow-hidden">
            <img
              className="h-48 sm:h-64 md:h-96 2xl:h-[48rem] w-full object-cover flex-shrink-0 transform scale-125 md:scale-100 transition-transform duration-300"
              src={card2}
              alt="Card 2"
            />
          </div>
          <div className="min-w-full overflow-hidden">
            <img
              className="h-48 sm:h-64 md:h-96 2xl:h-[48rem] w-full object-cover flex-shrink-0 transform scale-125 md:scale-100 transition-transform duration-300"
              src={card3}
              alt="Card 3"
            />
          </div>
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
  );
}

export default Carousel;
