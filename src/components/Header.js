import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getBooks } from "../api/books/books.api";
import { deleteJwt } from "../utils/jwt";

import logo from "../assets/images/png-transparent-drawing-graphy-tree-of-life-others-removebg-preview.png";

const Header = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [showProfilePopover, setShowProfilePopover] = useState(false);

  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const profilePopoverRef = useRef(null);

  const searchBooks = async (search) => {
    try {
      if (search) {
        const { books } = await getBooks(search, 1, 10);
        setSuggestions(books);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/?search=${search}`);
  };

  const handleClickProfile = () => {
    if (user) {
      setShowProfilePopover(true);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    clearUser();
    deleteJwt();
    navigate("/login");
  };

  const handleCloseProfile = (e) => {
    if (
      profilePopoverRef.current &&
      !profilePopoverRef.current.contains(e.target)
    ) {
      setShowProfilePopover(false);
    }
  };

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
    } else {
      const handler = setTimeout(() => {
        searchBooks(search);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [search]);

  useEffect(() => {
    document.addEventListener("click", handleCloseProfile, true);

    return () => {
      document.removeEventListener("click", handleCloseProfile, true);
    };
  }, []);

  return (
    <>
      <div className="flex justify-end gap-4 md:gap-14 text-sm items-center p-5 pb-1">
        <Link to="#" className="hover:text-gray-600">
          Sobre nós
        </Link>
        <Link to="/form" className="hover:text-gray-600">
          Fale Conosco
        </Link>
      </div>
      <header className="p-5 bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center border rounded-lg p-5 bg-white">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img className="w-16" src={logo} alt="logo" />
            <Link to="/">
              <h1 className="text-sky-950 font-bold text-lg md:text-2xl">
                Livraria Virtual
              </h1>
            </Link>
          </div>
          <div className="relative flex items-center flex-col h-8 w-full md:w-1/2 lg:w-1/3">
            <div className="flex items-center w-full h-9 border p-1 rounded-md">
              <input
                value={search}
                onChange={handleChangeSearch}
                onFocus={() => setIsSearchInputFocused(true)}
                onBlur={() => setIsSearchInputFocused(false)}
                placeholder="Buscar"
                className="flex-grow pl-2 text-slate-500 text-sm h-full outline-none"
              />
              <button type="button" onClick={handleSearch}>
                <ion-icon
                  name="search-outline"
                  className="text-slate-500 mx-2 cursor-pointer"
                ></ion-icon>
              </button>
            </div>
            {isSearchInputFocused && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 max-h-48 overflow-y-auto w-full border p-1 rounded-md bg-white border-gray-300 shadow-lg z-50">
                {suggestions.map((suggestion) => (
                  <div className="flex flex-row m-1" key={suggestion.id}>
                    <div className="h-12 w-8">
                      <img
                        src={suggestion.image_1}
                        alt={`Contem a capa do livro ${suggestion.book_name}`}
                        className="h-12 object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <h5>{suggestion.book_name}</h5>
                      <p className="text-sm text-slate-600">
                        {suggestion.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex gap-4 mt-4 md:mt-0">
            <span className="text-slate-700 bg-slate-200 rounded-md p-2 h-8 hover:bg-slate-400">
              <Link onClick={handleClickProfile}>
                <ion-icon name="person"></ion-icon>
              </Link>
            </span>
            <span className="text-slate-700 bg-slate-200 rounded-md p-2 h-8 hover:bg-slate-400">
              <Link to="/favorites">
                <ion-icon name="heart"></ion-icon>
              </Link>
            </span>

            {showProfilePopover && (
              <div
                ref={profilePopoverRef}
                className="absolute min-w-36 max-w-48 right-0 top-full mt-2 z-20 p-3 rounded-md shadow-lg bg-white border"
              >
                <div className="flex flex-col flex-1">
                  <h6 className="text-slate-700">Olá, {user.name}!</h6>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 p-0 max-w-fit self-end"
                  >
                    <span className="flex items-center text-red-700 hover:text-red-800">
                      <p className="mr-1 text-[0.95rem]">Sair</p>
                      <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
