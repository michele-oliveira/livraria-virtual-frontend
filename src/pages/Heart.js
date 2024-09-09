import Favorite from "../components/Favorite";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import star from"../assets/images/livrostar.jpg";
import starwars from "../assets/images/livrostarwars.png";

const Heart = () => (
  <div className="bg-gray-100">
    <Header />
    <Nav />
    <section className="pt-10 mb-5">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
        <Favorite image={star} hoverImage={starwars} title ="Star Wars Trilogia"/>
      </div>
    </section>
    <Footer />
  </div>
);

export default Heart;
