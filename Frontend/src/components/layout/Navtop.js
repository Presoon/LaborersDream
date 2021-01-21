import React, { PureComponent } from "react";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

class Navtop extends PureComponent {
  render() {
    const user = AuthService.getCurrentUser();
    return (
      <>
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
          <div className="container-fluid">
            <ul className="nav navbar-nav flex-nowrap ml-auto">
              <div className="d-none d-sm-block topbar-divider"></div>
              <li className="nav-item dropdown no-arrow" role="presentation">
                <div className="nav-item dropdown no-arrow">
                  <a
                    className="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="https://www.google.pl"
                  >
                    <span className="d-none d-lg-inline mr-2 text-gray-600 small">
                      Zalogowany użytkownik:{" "}
                      <strong>{user.name + " " + user.surname}</strong>
                      {user.role === 2 ? (
                        <>
                          {" "}
                          jako<strong> ADMINISTRATOR</strong>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                    {user.role === 2 ? (
                      <i className="fas fa-user-cog fa-2x text-gray-600" />
                    ) : user.role === 1 ? (
                      <i className="fas fa-tools fa-2x text-gray-600" />
                    ) : (
                      <i className="fas fa-flask fa-2x text-gray-600" />
                    )}
                  </a>
                  <div
                    className="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                    role="menu"
                  >
                    <Link
                      className="dropdown-item"
                      role="presentation"
                      to="/login"
                      onClick={() => {
                        AuthService.logout();
                        window.location.reload();
                      }}
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      &nbsp;Wyloguj
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navtop;
