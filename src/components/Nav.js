import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "./react-stacked-toast";
import { useBooks } from "../hooks/useBooks";

const Nav = () => {
  const [shownMenu, setShownMenu] = useState(null);

  const { bookGenders, loading, error } = useBooks();

  const handleClickMenu = useCallback(
    (event) => {
      const menus = bookGenders.map(gender => `menu-${gender.id}`);

      if (menus.includes(event.target.id)) {
        if (event.target.id === shownMenu) {
          setShownMenu(null);
        } else {
          setShownMenu(event.target.id);
        }
      } else {
        setShownMenu(null);
      }
    },
    [shownMenu, bookGenders]
  );

  const isMenuVisible = (genderId) => shownMenu === `menu-${genderId}`;

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar detalhes adicionais do livro",
        description:
          "Encontramos um erro ao carregar os gêneros e subgêneros dos livros. Tente novamente ou  verifique sua conexão",
        type: 'error',
        duration: 3000,
      });
    }
  }, [error])

  useEffect(() => {
    document.addEventListener("click", handleClickMenu, true);

    return () => {
      document.removeEventListener("click", handleClickMenu, true);
    };
  }, [handleClickMenu]);

  if (loading || error || !bookGenders) {
    return null;
  }

  return (
    <nav className="relative flex pt-7 text-sm gap-10 sm:gap-20 z-20 justify-center items-center ">
      <ul className="flex flex-wrap max-w-72 md:max-w-[32rem] lg:max-w-[42rem] gap-6 sm:gap-10 justify-center">
        <li>
        <Link to="/">
          <span className="p-2 text-slate-600 bg-slate-300 rounded-md hover:bg-slate-500">
            <ion-icon name="home"></ion-icon>
          </span>
        </Link>
        </li>
        {bookGenders.map(gender => (
          <li className="relative group" key={gender.id}>
            <Link
              to="#"
              id={`menu-${gender.id}`}
              className="py-3 text-slate-600 hover:text-gray-600"
            >
              {gender.name}
            </Link>
            <ul
              id={`submenu-${gender.id}`}
              className={`absolute left-1/2 transform -translate-x-1/2 mt-2 bg-slate-200 text-slate-600 rounded-md shadow-lg z-30 group-hover:block ${
                isMenuVisible(gender.id) ? "" : "hidden"
              } overflow-hidden`}
            >
              {gender.subgenders.map(subgender => (
                <li key={subgender.id}>
                  <Link
                    to={`/?subgender_id=${subgender.id}`}
                    className="block px-4 py-2 hover:bg-slate-300"
                  >
                    {subgender.name}
                  </Link>
              </li>  
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
