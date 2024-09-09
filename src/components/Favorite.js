import { Link } from "react-router-dom";

const Favorite = (props) => (
  <div className="relative border p-4 text-center group bg-white rounded-md">
    <Link to="./page.html">
      <img
        className="w-24 sm:w-32 md:w-44 block mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        src={props.image}
        alt="Star Wars Trilogia"
      />
      <img
        className="w-32 sm:w-44 md:w-72 block mx-auto absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        src={props.hoverImage}
        alt="Star Wars Trilogia Hover"
      />
    </Link>
    <p className="mt-2 text-sm font-bold mb-4 text-slate-600">{props.title}</p>
    <div className="flex flex-col items-center gap-2 mt-4 mx-auto max-w-xs ">
      <button className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
        Baixar
      </button>
      <button className="bg-slate-200 text-black px-4 sm:px-6 py-2 rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
        Remover dos favoritos
      </button>
    </div>
  </div>
);

export default Favorite;
