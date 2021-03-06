import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOut } from "../../redux/actions/authActions";

export const Header = () => {
  const isAuth = useSelector((state) => state.session.isAuth);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        ListToWatch
      </Link>

      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          {isAuth ? (
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
        {isAuth && (
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={(e) => dispatch(SignOut())}
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
