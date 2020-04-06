import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./MobileNav.scss";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

function MobileNav({ history, url }) {
  const [menu] = useState(["Feed", "Shop", "Following", "Followers", "Stats"]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function menuChanger() {
      history.push(`${url}/${menu[currentPage]}`);
    }
    menuChanger();
  }, [currentPage, history, menu, url]);
  return (
    <>
      <div className="mobileNav">
        <div
          className="back"
          onClick={() =>
            currentPage !== 0 ? setCurrentPage(currentPage - 1) : null
          }
        >
          <MdArrowBack />
        </div>
        <span>{menu[currentPage]}</span>
        <div
          className="forward"
          onClick={() =>
            currentPage !== menu.length - 1
              ? setCurrentPage(currentPage + 1)
              : null
          }
        >
          <MdArrowForward />
        </div>
      </div>
    </>
  );
}

export default withRouter(MobileNav);
