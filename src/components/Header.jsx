/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header className="flex items-center p-4 bg-white md:justify-center ">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-28 h-28 " />
        </Link>
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-teal-700">{title}</h1>
        <hr className="border-teal-700 border-t-2 w-full mt-1" />{" "}
      </div>
    </header>
  );
};

export default Header;
