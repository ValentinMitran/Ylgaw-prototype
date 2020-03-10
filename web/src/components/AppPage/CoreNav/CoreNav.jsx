import React from "react";
import {Link } from "react-router-dom";
import { MdHome, MdPerson, MdSearch } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import './CoreNav.scss';

function CoreNav() {
  return (
    <>
      <nav className="coreNav">
        <Link to="/home"><MdHome /></Link>
        <Link to="/search"><MdSearch /></Link>
        <Link to="/apps"><FiPlusSquare /></Link>
        <Link to="/notifications"><IoMdHeartEmpty /></Link>
        <Link to="/profile"><MdPerson /></Link>
      </nav>
    </>
  );
}

export default CoreNav;
