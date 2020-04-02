import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./MobileNav.scss";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

function MobileNav({ history, url }) {
  const [menu, setMenu] = useState(["Feed", "Shop", "Following", "Followers"]);
  const [currentPage, setCurrentPage] = useState(0);
  function menuChanger() {
    history.push(`${url}/${menu[currentPage]}`);
  }
  useEffect(() => {
    menuChanger();
  }, [currentPage]);
  return (
    <>
      <div className="mobileNav">
        <div
          className="back"
          onClick={() =>
            currentPage != 0 ? setCurrentPage(currentPage - 1) : null
          }
        >
          <MdArrowBack />
        </div>
        <span>{menu[currentPage]}</span>
        <div
          className="forward"
          onClick={() =>
            currentPage != 3 ? setCurrentPage(currentPage + 1) : null
          }
        >
          <MdArrowForward />
        </div>
      </div>
    </>
  );
}

export default withRouter(MobileNav);
