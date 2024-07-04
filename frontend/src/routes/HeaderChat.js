import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from "../tokenContext";

const ChatHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logOut, user } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {!!user && (
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-primary"
          >
            {t("interface.logOut")}
          </button>
        )}
      </div>
    </nav>
  );
};

export default ChatHeader;
