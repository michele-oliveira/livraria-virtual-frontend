import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="relative flex justify-center items-center text-sm pt-7 gap-10 sm:gap-20 z-20">
    <Link to="/">
      <span className="text-slate-600 bg-slate-300 rounded-md p-2 hover:bg-slate-500">
        <ion-icon name="home"></ion-icon>
      </span>
    </Link>
    <ul className="flex flex-wrap justify-center gap-6 sm:gap-10">
      <li id="acao" className="relative group">
        <Link to="#" className="text-slate-600 hover:text-gray-600">
          Ação
        </Link>
        <ul
          id="acao-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Aventura
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Espionagem
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Policial
            </Link>
          </li>
        </ul>
      </li>
      <li id="cientificos" className="relative group">
        <Link to="#" className="text-slate-600 hover:text-gray-600">
          Científicos
        </Link>
        <ul
          id="cientificos-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Astronomia
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Biologia
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Física
            </Link>
          </li>
        </ul>
      </li>

      <li id="economia" className="relative group">
        <Link to="#" className="text-slate-600 hover:text-gray-600">
          Economia
        </Link>
        <ul
          id="economia-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Microeconomia
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Macroeconomia
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Economia internacional
            </Link>
          </li>
        </ul>
      </li>

      <li className="relative group">
        <Link
          to="#"
          id="ficcaocientifica"
          className="text-slate-600 hover:text-gray-600"
        >
          Ficção Científica
        </Link>
        <ul
          id="ficcaocientifica-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Space Opera
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Cyberpunk
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Distopia
            </Link>
          </li>
        </ul>
      </li>
      <li className="relative group">
        <Link
          to="#"
          id="romance"
          className="text-slate-600 hover:text-gray-600"
        >
          Romance
        </Link>
        <ul
          id="romance-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Históricos
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Conteporâneo
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Policial
            </Link>
          </li>
        </ul>
      </li>
      <li className="relative group">
        <Link
          to="#"
          id="religiosos"
          className="text-slate-600 hover:text-gray-600"
        >
          Religiosos
        </Link>
        <ul
          id="religiosos-submenu"
          className="absolute left-0 mt-2 hidden bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block"
        >
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Espiritismo
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Cristianismo
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
              Islamismo
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default Nav;
