import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    document.addEventListener("click", handleClickMenu, true);

    return () => {
      document.removeEventListener("click", handleClickMenu, true);
    };
  }, [handleClickMenu]);

  if (loading || error || !bookGenders) {
    return null;
  }

  return (
    <nav className="relative flex justify-center items-center text-sm pt-7 gap-10 sm:gap-20 z-20">
      <Link to="/">
        <span className="text-slate-600 bg-slate-300 rounded-md p-2 hover:bg-slate-500">
          <ion-icon name="home"></ion-icon>
        </span>
      </Link>
      <ul className="flex flex-wrap justify-center gap-6 sm:gap-10">
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
                  <Link to="#" className="block px-4 py-2 hover:bg-slate-300">
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
