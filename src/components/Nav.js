import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [shownMenu, setShownMenu] = useState(null);

  const handleClickMenu = useCallback((event) => {
    const menus = [
      "acao",
      "cientificos",
      "economia",
      "ficcaocientifica",
      "romance",
      "religiosos",
    ];
    
    if (menus.includes(event.target.id)) {
      if (event.target.id === shownMenu) {
        setShownMenu(null);
      } else {
        setShownMenu(event.target.id);
      }
    } else {
      setShownMenu(null);
    }
  }, [shownMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClickMenu, true);

    return () => {
      document.removeEventListener("click", handleClickMenu, true);
    };
  }, [handleClickMenu]);

  return (
    <nav className="relative flex justify-center items-center text-sm pt-7 gap-10 sm:gap-20 z-20">
      <Link to="/">
        <span className="text-slate-600 bg-slate-300 rounded-md p-2 hover:bg-slate-500">
          <ion-icon name="home"></ion-icon>
        </span>
      </Link>
      <ul className="flex flex-wrap justify-center gap-6 sm:gap-10">
        <li className="relative group">
          <Link to="#" id="acao" className="text-slate-600 hover:text-gray-600">
            Ação
          </Link>
          <ul
            id="acao-submenu"
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'acao' ? '' : 'hidden'}`}
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
        <li className="relative group">
          <Link
            to="#"
            id="cientificos"
            className="text-slate-600 hover:text-gray-600"
          >
            Científicos
          </Link>
          <ul
            id="cientificos-submenu"
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'cientificos' ? '' : 'hidden'}`}
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

        <li className="relative group">
          <Link
            to="#"
            id="economia"
            className="text-slate-600 hover:text-gray-600"
          >
            Economia
          </Link>
          <ul
            id="economia-submenu"
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'economia' ? '' : 'hidden'}`}
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
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'ficcaocientifica' ? '' : 'hidden'}`}
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
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'romance' ? '' : 'hidden'}`}
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
            className={`absolute left-0 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${shownMenu === 'religiosos' ? '' : 'hidden'}`}
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
};

export default Nav;
