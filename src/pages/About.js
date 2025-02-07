import Container from "../components/Container";
import Content from "../components/Content";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import openBook from "../assets/images/open-book.png";

const About = () => (
  <Container>
    <Header />
    <Nav />
    <Content className="flex flex-col items-center px-6 md:px-16 lg:px-28 py-16 md:py-24 lg:py-32">
      <h1 className="text-2xl font-bold mb-4 text-center pb-10 text-sky-950">
        Sobre a Livraria Virtual
      </h1>
      <p className="text-lg text-center mb-4">
        Bem-vindo à nossa livraria digital! Nossa história começou com uma
        simples missão: facilitar o acesso à leitura para todos. Desde o início,
        acreditamos que os livros têm o poder de transformar vidas, e nossa meta
        é tornar o conhecimento acessível de forma prática e digital.
      </p>
      <p className="text-lg text-center">
        Nossa plataforma oferece uma ampla coleção de títulos dos mais variados
        gêneros. Você pode baixar seus livros favoritos, adicioná-los à sua
        lista de favoritos e ter sempre à mão aqueles que mais gosta,
        facilitando a busca e a organização da sua leitura. Estamos sempre
        trabalhando para trazer novos recursos e expandir nosso acervo para
        proporcionar a melhor experiência possível aos nossos leitores.
      </p>

      <div className="w-full flex justify-center mt-8">
        <img
          className="max-w-full md:max-w-md lg:max-w-lg xl:max-w-2xl"
          src={openBook}
          alt="Livro Aberto"
        />
      </div>
    </Content>
    <Footer />
  </Container>
);

export default About;
