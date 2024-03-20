import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

import quit from './../images/icons/quit.svg';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar__user">
        <img src={currentUser.photoURL} alt="" className="navbar__user-image" />
        <div className="navbar__user-name">
          <p>{currentUser.displayName}</p>
        </div>
      </div>

      <button
        className="navbar__button button button-icon"
        title="Выйти"
        onClick={() => signOut(auth)}
      >
        <img src={quit} alt="Кнопка выхода" className="navbar__quit" />
      </button>
    </div>
  );
};

export default Navbar;
