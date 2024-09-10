import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import star from "../assets/images/livrostar.jpg";

const Book = (props) => (
  <div className="bg-gray-100">
    <Header />
    <Nav />
    <section className="flex flex-col md:flex-row p-6 rounded-lg">
      <div className="flex-shrink-0 relative p-5">
        <img
          className="w-56 sm:w-64 md:w-72 rounded-lg shadow-md transition-opacity duration-300 ease-in-out group-hover:opacity-80"
          src={star}
          alt="Star Wars Trilogia"
        />

        <div className="w-full flex justify-center gap-2 p-5">
          <button className="bg-slate-200 text-black px-2 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm flex items-center justify-center w-32 h-12">
            Baixar
          </button>
          <Link to="#" className="flex items-center justify-center w-12 h-12">
            <span className="bg-slate-200 rounded-md p-3 hover:bg-slate-400 text-xl flex justify-center">
              <ion-icon name="heart"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center ml-4 mt-4 bg-white border p-10 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 pb-5">STAR WARS A TRILOGIA</h1>
        <p className="text-gray-500">Editora: Darkside</p>
        <p className="text-gray-500">Idioma: Português</p>
        <p className="text-gray-500">Páginas: 528</p>
        <p className="text-gray-500">Gênero: Ficção científica</p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          Em uma galáxia muito, muito distante, os fãs de Star Wars aguardavam
          por este momento inesquecível. No ano de encerramento da saga mais
          lendária da história do cinema, a DarkSide® Books apresenta uma nova
          edição de Star Wars: A Trilogia. Muito além de um fenômeno do cinema,
          Star Wars ditou regras na ficção científica, inspirou milhares de
          pessoas com a filosofia Jedi, nos levou até mundos incríveis e
          apresentou os personagens mais cativantes que poderiam existir no
          espaço.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          As clássicas histórias de Luke Skywalker, Han Solo, Princesa Leia,
          Mestre Yoda e Darth Vader vão ganhar detalhes de outra galáxia em uma
          nova edição que todo geek terá orgulho de exibir em sua estante. A
          nova capa de Star Wars: A Trilogia tem detalhes em dourado, material
          semelhante a couro, Leia.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          No ano em que a saga Star Wars chega ao fim com Star Wars Episódio IX:
          A Ascensão Skywalker, a DarkSide® Books apresenta uma nova edição que
          faz jus a importância da saga iniciada em 1977. Em Star Wars: A
          Trilogia, George Lucas escreve o Episódio IV – Uma Nova Esperança, com
          participação de Alan Dean Foster, a partir de uma adaptação do roteiro
          original do longa, e mostra, pela primeira vez, o jovem Luke Skywalker
          aos fãs, cinco meses antes do lançamento oficial do filme. O Episódio
          V – O Império Contra-Ataca, escrito por Donald F. Glut, é um dos mais
          adorados da saga e coloca Luke diante de lados opostos da Força. “Eu
          jamais poderia imaginar o nível dos laços emocionais que o público
          havia desenvolvido com Luke como um símbolo de bondade e Vader como a
          personificação do mal”, declarou George Lucas tempos depois.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          Já o Episódio VI – O Retorno de Jedi foi escrito por James Kahn –
          mesmo autor de Os Goonies, lançado pela DarkSide® Books. E preparar
          esse capítulo final da trilogia foi um grande desafio para George
          Lucas, já que o roteiro apresentava muitas histórias abertas e era
          preciso deixar tudo muito bem amarrado para os próximos filmes.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          A nova edição de Star Wars: A Trilogia, da DarkSide® Books, é também
          uma homenagem aos atores da saga que se foram recentemente, mas serão
          para sempre lembrados. Carrie Fisher (Princesa Leia) e Peter Mayhew
          (Chewbacca) se tornaram figuras fundamentais em Star Wars e
          conquistaram o coração dos fãs. Para os espectadores ainda mais
          saudosos, Fisher aparecerá em Star Wars – Episódio IX: A Ascensão
          Skywalker. Cenas gravadas para o Episódio VII (2015), e até então
          inéditas, serão aproveitadas no novo longa e prometem emocionar a
          todos.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          A DarkSide® Books também se preocupou em lançar a nova edição de Star
          Wars: A Trilogia no mês mais importante para a saga: maio. Somente um
          verdadeiro fã de Star Wars consegue entender essa importância. No dia
          4 de maio é celebrado o #MayThe4thBeWithYou, uma espécie de feriado
          não-oficial com milhares de comemorações e reuniões dos fãs de Star
          Wars pelo mundo. Ainda neste mês, no dia 25 – conhecido como o Dia da
          Toalha –, foram lançados no cinema os Episódios IV e VI da saga; já o
          Episódio V ganhou as telonas no dia 21 de maio de 1980; George Lucas
          comemora seu aniversário no dia 14 e outro nome marcante também
          celebraria neste mês: Peter Mayhew, nascido no dia 19.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          Os fãs de Star Wars já podem comemorar em grande estilo, com uma
          edição épica que será admirada até mesmo das galáxias mais distantes
          do universo – uma verdadeira bíblia geek, o manual que todo e qualquer
          mochileiro Jedi precisa ter em sua coleção.
        </p>
      </div>
    </section>
    <Footer />
  </div>
);

export default Book;
