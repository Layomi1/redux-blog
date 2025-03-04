import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-indigo-700 px-5 py-4 text-white">
      <h1 className=" text-3xl md:text-[3.5rem]">Redux blog</h1>
      <nav>
        <ul className="flex gap-5">
          <li className="cursor-pointer active:underline ">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer active:underline ">
            <Link to="post">Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
