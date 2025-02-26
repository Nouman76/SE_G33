import React from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header>
      <TopBar />
      <Navbar />
      <SearchBar />
    </header>
  );
};

export default Header;
