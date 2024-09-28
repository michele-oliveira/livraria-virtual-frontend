import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/png-transparent-drawing-graphy-tree-of-life-others-removebg-preview.png";

const Header = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?search=${search}`);
  };

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
          <div className="flex items-center w-full md:w-1/2 lg:w-1/3 border p-1 rounded-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow pl-2 text-slate-500 text-sm h-full outline-none"
              placeholder="Buscar"
            />
            <button type="button" onClick={handleSearch}>
              <ion-icon
                name="search-outline"
                className="text-slate-500 mx-2 cursor-pointer"
              ></ion-icon>
            </button>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 ">
            <span className="text-slate-700 bg-slate-200 rounded-md p-2 h-8 hover:bg-slate-400">
              <Link to="/login">
                <ion-icon name="person"></ion-icon>
              </Link>
            </span>
            <span className="text-slate-700 bg-slate-200 rounded-md p-2 h-8 hover:bg-slate-400">
              <Link to="/favorites">
                <ion-icon name="heart"></ion-icon>
              </Link>
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
